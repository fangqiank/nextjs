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

		const existSubscription = await db.subscription.findFirst({
			where: {
				subredditId,
				userId: session.user.id
			}
		})

		if(existSubscription)
			return new Response('Subscription already existed', {
				status: 409
			})

		await db.subscription.create({
			data: {
				subredditId,
				userId: session.user.id
			}
		})

		return new Response(subredditId)
	}catch(err){
		if(err instanceof ZodError)
			return new Response(err.message, {
				status: 400
			})

		return new Response('Could not subscribe to subreddit at this time. Please try later', {
			status: 500
		})
	}
}