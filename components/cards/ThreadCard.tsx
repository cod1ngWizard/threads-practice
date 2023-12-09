import Link from 'next/link';
import Image from 'next/image';

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
  return (
    <article className='flex flex-col w-full rounded-xl bg-dark-2 p-7'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ThreadCard;
