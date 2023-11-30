import Image from "next/image";
import Link from "next/link";
import DeleteTweet from "../forms/DeleteTweet";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
}

function TweetCard({
                       id,
                       currentUserId,
                       parentId,
                       content,
                       author,
                       createdAt,
                       comments,
                       isComment,
                   }: Props) {

    const formatDate = (createdAt: string): string => {
        const now = new Date();
        const differenceInSeconds = Math.floor((now.getTime() - new Date(createdAt).getTime()) / 1000);

        if (differenceInSeconds < 60) {
            return 'Just now';
        } else if (differenceInSeconds < 3600) {
            const minutes = Math.floor(differenceInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (differenceInSeconds < 86400) {
            const hours = Math.floor(differenceInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            // Convert createdAt from string to Date object
            return new Date(createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        }
    };

    return (
        <article className="flex max-w-full flex-col border-b-1 p-4">
            <div className="flex items-start gap-3">
                <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                    <Image
                        src={author.image || '/assets/default-profile.png'}
                        alt='User profile'
                        layout='fill'
                        className='rounded-full '
                    />
                </Link>
                <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                        <Link href={`/profile/${author.id}`}>
                            <h4 className='cursor-pointer text-base-semibold text-dark-1'>
                                {author.name}
                            </h4>
                        </Link>
                        <span className="text-small-regular text-gray-500">{formatDate(createdAt)}</span>
                    </div>
                    <p className="text-base-regular">{content}</p>
                </div>
            </div>

            <div className="flex gap-3.5 pt-2">
                <Image
                    src='/assets/heart-gray.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer'
                />
                <Link href={`/tweet/${id}`}>
                    <Image
                        src='/assets/reply.svg'
                        alt='reply'
                        width={24}
                        height={24}
                        className='cursor-pointer'
                    />
                </Link>
                <Image
                    src='/assets/repost.svg'
                    alt='repost'
                    width={24}
                    height={24}
                    className='cursor-pointer'
                />
                <Image
                    src='/assets/share.svg'
                    alt='share'
                    width={24}
                    height={24}
                    className='cursor-pointer'
                />
                <DeleteTweet
                    tweetId={JSON.stringify(id)}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={isComment}
                />
            </div>


            {!isComment && comments.length > 0 && (
                <div className='flex items-center gap-2 '>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && "-ml-5"} rounded-full `}
                        />
                    ))}

                    <Link href={`/tweet/${id}`}>
                        <p className='text-gray-1 text-subtle-medium'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}

            {isComment && comments.length > 0 && (
                <div className='flex items-center gap-2 '>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && "-ml-5"} rounded-full `}
                        />
                    ))}

                    <Link href={`/tweet/${id}`}>
                        <p className='text-gray-1 text-subtle-medium'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}
        </article>
    );
}

export default TweetCard;
