import ThreadCard from '@/components/cards/ThreadCard';
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  const threadInfo = await fetchThreadById(params.id);
  return (
    <section className='relative'>
      <div>
        <ThreadCard
          key={threadInfo._id}
          id={threadInfo._id}
          currentUserId={user?.id || ''}
          parentId={threadInfo.parentId}
          content={threadInfo.text}
          author={threadInfo.author}
          community={threadInfo.community}
          createdAt={threadInfo.createdAt}
          comments={threadInfo.children}
          likedBy={threadInfo.likedBy}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={threadInfo._id.toString()}
          currentUserImg={user.imageUrl}
          currentUserId={userInfo._id.toString()}
        />
      </div>

      <div className='mt-10'>
        {threadInfo.children.map((comment: any /* I don't like this */) => (
          <ThreadCard
            id={comment._id.toString()}
            currentUserId={userInfo._id.toString()}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
            likedBy={comment.likedBy}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
