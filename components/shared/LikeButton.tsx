'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { addLikeToThread } from '@/lib/actions/thread.actions';

type Props = {
  userId: string;
  threadId: string;
  path?: string;
  liked?: boolean;
};

export default function LikeButton({ userId, threadId, path, liked }: Props) {
  return (
    <button onClick={(e) => addLikeToThread(threadId, userId, path, liked)}>
      <Image
        src={liked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'}
        alt='heart'
        width={24}
        height={24}
        className='object-contain cursor-pointer'
      />
    </button>
  );
}
