'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';
import { useOrganization } from '@clerk/nextjs';
//import { updateUser } from '@/lib/actions/user.actions';

type Props = {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
};

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  console.log(organization, 'organization');

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    //console.log(organization, 'organizationInfo');
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-10 mt-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={15}
                  className='border no-focus border-dark-4 bg-dark-3 text-light-1'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
