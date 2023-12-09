import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions';
import { UserButton, currentUser } from '@clerk/nextjs';

export default async function Home() {
  const retrievedPosts = await fetchPosts();
  const user = await currentUser();

  return (
    <>
      <h1 className='text-left head-text'>Home</h1>

      <section className='flex flex-col gap-10 mt-9'>
        {retrievedPosts.posts.length === 0 ? (
          <p>No posts written yet</p>
        ) : (
          <div>
            {retrievedPosts.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ''}
                comments={post.children}
                content={post.text}
                parentId={post.parentId}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
