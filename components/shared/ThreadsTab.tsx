import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.actions';

type Props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: any;
  if (accountType === 'Community') {
    result = await fetchCommunityPosts(accountId);
    console.log(result, 'result');
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect('/');
  }

  return (
    <section className='flex flex-col gap-10 mt-9'>
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          comments={thread.children}
          content={thread.text}
          parentId={thread.parentId}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id }
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
