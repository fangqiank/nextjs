import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {CommentVoteValidator} from '@/lib/validatiors/vote'
import {z} from 'zod'

export const PATCH = async (req: Request) => {
	try{
		const body = await req.json()

		const {commentId, VoteType} = CommentVoteValidator.parse(body)

		const session = await getAuthSession()

		if(!session?.user)
			return new Response('Unauthorized', {
				status: 401
			})

		const existedVote = await db.commentVote.findFirst({
			where: {
				userId: session.user.id,
				commentId
			}
		})

		if(existedVote) {
			if(existedVote.type === VoteType){
				await db.commentVote.delete({
					where: {
						userId_commentId: {
							commentId,
							userId: session.user.id
						}
					}
				})

				return new Response('OK')
			}else {
				await db.commentVote.update({
					where: {
						userId_commentId: {
							commentId,
							userId: session.user.id
						}
					},

					data: {
						type: VoteType
					}
				})

				return new Response('OK')
			}
		}

		await db.commentVote.create({
			data: {
				type: VoteType,
				userId: session.user.id,
				commentId
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