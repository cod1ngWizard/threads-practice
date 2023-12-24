import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function Page() {
  const user = await currentUser(); //CLERK INFO

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  //getActivity
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className='flex flex-col gap-5 mt-10'>
        {activity && activity.length > 0 ? (
          <>
            {activity?.map((act) => {
              return (
                <Link key={act._id} href={`/thread/${act.parentId}`}>
                  <article className='activity-card'>
                    <Image
                      src={act.author.image}
                      alt='Profile picture'
                      width={20}
                      height={20}
                      className='object-cover rounded-full'
                    />
                    <p className='!text-small-regular text-light-1'>
                      <span className='mr-1 text-primary-500'>
                        {act.author.name}
                      </span>{' '}
                      replied to your Thread
                    </p>
                  </article>
                </Link>
              );
            })}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        )}
      </h1>
    </section>
  );
}

export default Page;
