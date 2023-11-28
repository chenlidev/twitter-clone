import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Comment from "@/components/forms/Comment";
import TweetCard from "@/components/cards/TweetCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchTweetById } from "@/lib/actions/tweet.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const tweet = await fetchTweetById(params.id);

  return (
    <section className='relative'>
      <div>
        <TweetCard
          id={tweet._id}
          currentUserId={user.id}
          parentId={tweet.parentId}
          content={tweet.text}
          author={tweet.author}
          createdAt={tweet.createdAt}
          comments={tweet.children}
        />
      </div>

        <Comment
          tweetId={params.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />

      <div>
        {tweet.children.map((childItem: any) => (
          <TweetCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
