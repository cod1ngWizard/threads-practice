import Image from 'next/image';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import UserCard from '@/components/cards/UserCard';

async function Page() {
  const user = await currentUser(); //CLERK INFO

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  //fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='mb-10 head-text'>Search</h1>

      {/* Search bar */}

      <div className='flex flex-col mt-14 gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No results</p>
        ) : (
          <>
            {result.users.map((user: any) => (
              <UserCard
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                personType={'User'}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
