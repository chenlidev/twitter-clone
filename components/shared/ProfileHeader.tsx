import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import React from "react";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: string;
}

function ProfileHeader({
                           accountId,
                           authUserId,
                           name,
                           username,
                           imgUrl,
                           bio,
                       }: Props) {
    return (
        <>
            <div className='flex items-center justify-between p-6'>
                <div className='flex items-center'>
                    <div className="relative h-20 w-20">
                        <Image
                            src={imgUrl}
                            alt='logo'
                            fill
                            className='rounded-full'
                        />
                    </div>

                    <div className='flex-1 p-5'>
                        <h2 className='text-small-semibold sm:text-heading3-bold text-xs sm:text-black-1'>
                            {name}
                        </h2>
                        <p className='text-small-medium sm:text-base-medium text-gray-1'>@{username}</p>
                    </div>

                </div>
                {accountId === authUserId && (
                    <Link href='/profile/edit'>
                        <Button
                            className="bg-white max-lg:hidden text-black font-medium py-2 px-4 rounded-3xl border border-gray-300 shadow-sm hover:bg-gray-200 w-[150px] h-[40px]">
                            Set up profile
                        </Button>
                        <Image
                            className="lg:hidden rounded-full cursor-pointer"
                            src="/assets/cog.svg"
                            alt="Tweet"
                            width={40}
                            height={40}
                        />
                    </Link>
                )}
            </div>
            <p className='p-6 text-small-regular sm:text-base-regular text-black-2'>{bio}</p>
        </>
    );
}

export default ProfileHeader;
