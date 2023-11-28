import {redirect} from "next/navigation";
import {fetchUserPosts} from "@/lib/actions/user.actions";
import TweetCard from "../cards/TweetCard";

interface Props {
    currentUserId: string;
    accountId: string;
}

async function TweetsTab({currentUserId, accountId}: Props) {

    const result = await fetchUserPosts(accountId);

    if (!result) {
        redirect("/");
    }

    return (
        <section className='mt-9 flex flex-col'>
            {result.tweets.map((tweet: any) => (
                <TweetCard
                    key={tweet._id}
                    id={tweet._id}
                    currentUserId={currentUserId}
                    parentId={tweet.parentId}
                    content={tweet.text}
                    author={{
                        name: result.name, image: result.image, id: result.id
                    }}
                    createdAt={tweet.createdAt}
                    comments={tweet.children}
                />
            ))}
        </section>
    );
}

export default TweetsTab;
