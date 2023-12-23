import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';

type Props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  const threads = await fetchUserPosts(accountId);

  if (!threads) {
    redirect('/');
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {threads.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          comments={thread.children}
          content={thread.text}
          parentId={thread.parentId}
          author={
            accountType === 'User'
              ? { name: threads.name, image: threads.image, id: threads.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
