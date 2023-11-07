'use client'

import {z} from 'zod'
import Image from 'next/image'
import {useForm} from 'react-hook-form'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '../ui/Form'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { CommentValidator } from '@/lib/validators/threadValidator'
import { addCommentToThread } from '@/lib/actions/thread.actions'

type CommentProps = {
	threadId: string,
	currentUserImg: string,
	currentUserId: string
}

export const Comment = ({
	threadId,
	currentUserImg,
	currentUserId
}: CommentProps) => {
	const pathname = usePathname()

	const form = useForm<z.infer<typeof CommentValidator>>({
		resolver: zodResolver(CommentValidator),
		defaultValues: {
			thread: ''
		}
	})

	const onSubmit =async (values:z.infer<typeof CommentValidator>) => {
		await addCommentToThread(
			threadId,
			values.thread,
			JSON.parse(currentUserId),
			pathname
		)

		form.reset()
	}

	const contents = (
		<Form {...form}>
			<form 
				className="comment-form"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='thread'
					render={({field}) => (
						<FormItem
							className='flex w-full items-center gap-3'
						>
							<FormLabel>
								<Image
									src={currentUserImg}
									alt='current user'
									width={48}
									height={48}
									className='rounded-full object-cover' 
								/>
							</FormLabel>

							<FormControl className='border-none bg-transparent'>
								<Input
									type='text'
									{...field}
									placeholder='Leave your comment...'
									className='no-focus text-light-1 outline-none' 
								/>
							</FormControl>
						</FormItem>
					)} 
				/>

				<Button
					type='submit'
					className='comment-form_btn'
				>
					Reply
				</Button>
			</form>
		</Form>
	)

	return contents
}