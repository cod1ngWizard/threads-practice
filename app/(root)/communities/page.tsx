import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import UserCard from '@/components/cards/UserCard';
import { fetchCommunities } from '@/lib/actions/community.actions';
import CommunityCard from '@/components/cards/CommunityCard';

async function Page() {
  const user = await currentUser(); //CLERK INFO

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }

  //fetch users
  const result = await fetchCommunities({
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='mb-10 head-text'>Search</h1>

      {/* Search bar */}

      <div className='flex flex-col mt-14 gap-9'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No communities</p>
        ) : (
          <>
            {result.communities.map((community: any) => (
              <CommunityCard
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
