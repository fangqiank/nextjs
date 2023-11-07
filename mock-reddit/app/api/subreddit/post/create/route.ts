import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {PostValidator} from '@/lib/validatiors/post'
import {z} from 'zod'

export const POST = async (req: Request) => {
	try{
		const body = await req.json()

		const {title, content, subredditId} = PostValidator.parse(body)

		const session = await getAuthSession()

		if(!session?.user)
			return new Response('Unauthorized', {
				status: 401
			})

		const result = await db.subscription.findFirst({
			where: {
				subredditId,
				userId: session.user.id
			}
		})

		if(!result)
			return new Response('Subscribe to post', {
				status: 403
			})

		await db.post.create({
			data: {
				title,
				content,
				authorId: session.user.id,
				subredditId
			}
		})

		return new Response('OK')
	}catch(err){
		if(err instanceof z.ZodError)
			return new Response(err.message, {
				status: 400
			})

		return new Response('Could not post to subreddit at this time. Please try later', {
			status: 500
		})
	}
} 