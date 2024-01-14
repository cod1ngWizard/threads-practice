import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import UserCard from '@/components/cards/UserCard';
import SearchBar from './SearchBar';

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchString = searchParams.searchString;

  const user = await currentUser(); //CLERK INFO

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  //fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: searchString as string,
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='mb-10 head-text'>Search</h1>
      {/* Search bar */}
      <SearchBar />
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
