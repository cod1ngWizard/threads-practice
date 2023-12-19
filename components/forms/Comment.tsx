'use client';

import Image from 'next/image';
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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { CommentValidation } from '@/lib/validations/thread';
import { addCommentToThread } from '@/lib/actions/thread.actions';
// import { createThread } from '@/lib/actions/thread.actions';

type Props = {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
};

function Comment({ threadId, currentUserId, currentUserImg }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    //console.log(JSON.parse(currentUserId), 'parsed currentUserId');

    await addCommentToThread(threadId, values.thread, currentUserId, pathname);

    form.reset();
  };

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex items-center w-full gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='Profile image'
                  width={48}
                  height={48}
                  className='object-cover rounded-full'
                />
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Comment...'
                  className='bg-transparent border-none'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
