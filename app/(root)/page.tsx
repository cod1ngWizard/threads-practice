import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const retrievedPosts: any = await fetchPosts();
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo) {
    redirect('/onboarding');
  }

  return (
    <>
      <h1 className='text-left head-text'>Home</h1>

      <section className='flex flex-col gap-10 mt-9'>
        {retrievedPosts.posts.length === 0 ? (
          <p>No posts written yet</p>
        ) : (
          <div>
            {retrievedPosts.posts.map((post: any) => {
              return (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={userInfo._id}
                  comments={post.children}
                  content={post.text}
                  parentId={post.parentId}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  likedBy={post.likedBy}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
