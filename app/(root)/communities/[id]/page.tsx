import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityTabs, profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import UserCard from '@/components/cards/UserCard';

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser(); //CLERK INFO

  if (!user) return null;

  const communityDetals = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetals.id}
        authUserId={user.id}
        name={communityDetals.name}
        username={communityDetals.username}
        imgUrl={communityDetals.image}
        bio={communityDetals.bio}
        type='Community'
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>
                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetals?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            /*  key={`content-${tab.label}`} */
            value='threads'
            className='w-full text-light-1'
          >
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetals._id}
              accountType='Community'
            />
          </TabsContent>
          <TabsContent
            /*  key={`content-${tab.label}`} */
            value='members'
            className='w-full text-light-1'
          >
            <section className='flex flex-col gap-10 mt-9'>
              {communityDetals?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent
            /*  key={`content-${tab.label}`} */
            value='requests'
            className='w-full text-light-1'
          >
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetals._id}
              accountType='Community'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
