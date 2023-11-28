"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
}

function UserCard({ id, name, username, imgUrl}: Props) {
  const router = useRouter();

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-dark-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <Button
        className='rounded-2xl'

        onClick={() => {
            router.push(`/profile/${id}`);
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
