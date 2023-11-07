import {z} from 'zod'

export const threadValidator = z.object({
	thread: z
		.string()
		.min(3, {
			message: 'Minimum 3 characters.'
		}),
	
	accountId: z.string(),
})

export const CommentValidator = z.object({
	thread: z
		.string()
		.nonempty()
		.min(3, {
			message: 'Minimum 3 characters.'
		})
})