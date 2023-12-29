import Link from 'next/link';
import Image from 'next/image';
import { formatDateString } from '@/lib/utils';

type Props = {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
};

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  console.log(community, 'communityData');
  return (
    <article
      className={`flex flex-col w-full rounded- ${
        isComment ? 'px-0 xs:px-7 mt-10' : 'bg-dark-2 p-7 mt-10 rounded'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex flex-row flex-1 w-full gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='Profile image'
                fill
                className='rounded-full cursor-pointer'
              />
            </Link>
            <div className='thread-card_bar' />
          </div>

          <div>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-2'>
                {author.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className='flex flex-col gap-3 mt-5'>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='object-contain cursor-pointer'
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='reply'
                    width={24}
                    height={24}
                    className='object-contain cursor-pointer'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='repost'
                  width={24}
                  height={24}
                  className='object-contain cursor-pointer'
                />
                <Image
                  src='/assets/share.svg'
                  alt='share'
                  width={24}
                  height={24}
                  className='object-contain cursor-pointer'
                />
              </div>

              {isComment && comments?.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='flex items-center mt-5'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)} - {community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            height={14}
            width={14}
            className='object-cover ml-1 rounded-full'
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
