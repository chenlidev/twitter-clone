"use client";

import Image from "next/image";
import {usePathname} from "next/navigation";

import {deleteTweet} from "@/lib/actions/tweet.actions";

interface Props {
    tweetId: string;
    currentUserId: string;
    authorId: string;
}

function DeleteTweet({
                         tweetId,
                         currentUserId,
                         authorId,
                     }: Props) {
    const pathname = usePathname();

    if (currentUserId !== authorId || pathname === "/") return null;

    return (
        <Image
            src='/assets/trash.svg'
            alt='delete'
            width={18}
            height={18}
            className='cursor-pointer object-contain'
            onClick={async () => {
                await deleteTweet(JSON.parse(tweetId), pathname);

            }}
        />
    );
}

export default DeleteTweet;
