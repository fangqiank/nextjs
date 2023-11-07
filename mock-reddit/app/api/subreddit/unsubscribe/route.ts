import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubredditSubscriptionValidator } from "@/lib/validatiors/subreddit"
import { ZodError, z } from "zod"

export const POST =async (req: Request) => {
	try{
		const session = await getAuthSession()

		if(!session?.user)
			return new Response('Unauthorized', {
				status: 401
			})

		const body = await req.json()
		
		const {subredditId} = SubredditSubscriptionValidator.parse(body)

		const existSubreddit = await db.subscription.findFirst({
			where: {
				subredditId,
				userId: session.user.id
			}
		})

		if(!existSubreddit)
			return new Response(`You've not been subscribed to this subreddit yet`, {
				status: 400
			})

		await db.subscription.delete({
			where: {
				userId_subredditId: {
					subredditId,
					userId: session.user.id
				}
			}
		})

		return new Response(subredditId)
	}catch(err){
		if(err instanceof z.ZodError)
			return new Response(err.message, {
				status: 400
			})

		return new Response('Could not unsubscribe from subreddit at this time. Please try later', {
			status: 500
		})
	}
}