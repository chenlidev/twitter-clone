"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Tweet from "../models/tweet.model";

export async function fetchTweets(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level tweets) (a tweet that is not a comment/reply).
  const postsQuery = Tweet.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });

  // Count the total number of top-level posts (tweets) i.e., tweets that are not comments.
  const totalPostsCount = await Tweet.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

interface Params {
  text: string,
  author: string,
  path: string,
}

export async function composeTweet({ text, author, path }: Params
) {
  try {
    connectToDB();


    const createdTweet = await Tweet.create({
      text,
      author,
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { tweets: createdTweet._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create tweet: ${error.message}`);
  }
}

async function fetchAllChildTweets(tweetId: string): Promise<any[]> {
  const childTweets = await Tweet.find({ parentId: tweetId });

  const descendantTweets = [];
  for (const childTweet of childTweets) {
    const descendants = await fetchAllChildTweets(childTweet._id);
    descendantTweets.push(childTweet, ...descendants);
  }

  return descendantTweets;
}

export async function deleteTweet(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the tweet to be deleted (the main tweet)
    const tweet = await Tweet.findById(id);

    if (!tweet) {
      throw new Error("Tweet not found");
    }

    // Fetch all child tweets and their descendants recursively
    const descendantTweets = await fetchAllChildTweets(id);

    // Get all descendant tweet IDs including the main tweet ID and child tweet IDs
    const descendantTweetIds = [
      id,
      ...descendantTweets.map((tweet) => tweet._id),
    ];

    // Extract the authorIds to update User model
    const uniqueAuthorIds = new Set(
        [
          ...descendantTweets.map((tweet) => tweet.author?._id?.toString()), // Use optional chaining to handle possible undefined values
          tweet.author?._id?.toString(),
        ].filter((id) => id !== undefined)
    );

    // Recursively delete child tweets and their descendants
    await Tweet.deleteMany({ _id: { $in: descendantTweetIds } });

    // Update User model
    await User.updateMany(
        { _id: { $in: Array.from(uniqueAuthorIds) } },
        { $pull: { tweets: { $in: descendantTweetIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete tweet: ${error.message}`);
  }
}

export async function fetchTweetById(tweetId: string) {
  connectToDB();

  try {
    const tweet = await Tweet.findById(tweetId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Tweet, // The model of the nested children (assuming it's the same "Tweet" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .exec();

    return tweet;
  } catch (err) {
    console.error("Error while fetching tweet:", err);
    throw new Error("Unable to fetch tweet");
  }
}

export async function addCommentToTweet(
    tweetId: string,
    commentText: string,
    userId: string,
    path: string
) {
  connectToDB();

  try {
    // Find the original tweet by its ID
    const originalTweet = await Tweet.findById(tweetId);

    if (!originalTweet) {
      throw new Error("Tweet not found");
    }

    // Create the new comment tweet
    const commentTweet = new Tweet({
      text: commentText,
      author: userId,
      parentId: tweetId, // Set the parentId to the original tweet's ID
    });

    // Save the comment tweet to the database
    const savedCommentTweet = await commentTweet.save();

    // Add the comment tweet's ID to the original tweet's children array
    originalTweet.children.push(savedCommentTweet._id);

    // Save the updated original tweet to the database
    await originalTweet.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
