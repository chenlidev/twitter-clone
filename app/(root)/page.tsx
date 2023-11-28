import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import TweetCard from "@/components/cards/TweetCard";
import Pagination from "@/components/shared/Pagination";
import {fetchTweets} from "@/lib/actions/tweet.actions";
import {fetchUser} from "@/lib/actions/user.actions";
import PostTweet from "@/components/forms/PostTweet";
import React from "react";
import Topbar from "@/components/shared/Topbar";

async function Home({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchTweets(
        searchParams.page ? +searchParams.page : 1,
        30
    );

    return (
        <section className='relative'>
            <Topbar/>
            <div className="pt-16 px-4 pb-4 border-b-1">
                <PostTweet userId={userInfo._id} userImage={userInfo.image}/>
            </div>
            <div>
                {result.posts.length === 0 ? (
                    <p className='no-result'>No tweets found</p>
                ) : (
                    <>
                        {result.posts.map((post) => (
                            <TweetCard
                                key={post._id}
                                id={post._id}
                                currentUserId={user.id}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                createdAt={post.createdAt}
                                comments={post.children}
                            />
                        ))}
                    </>
                )}
            </div>

            <Pagination
                path='/'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            />
        </section>
    );
}

export default Home;
