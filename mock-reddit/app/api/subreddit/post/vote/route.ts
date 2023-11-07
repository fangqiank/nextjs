import {getAuthSession} from '@/lib/auth'
import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { PostVoteValidator } from '@/lib/validatiors/vote'
import { CachedPost } from '@/types/redis'
import {z} from 'zod'

const CACHE_AFTER_UPVOTES = 1

export const PATCH = async (req: Request) => {
	try{
		const body = await req.json()

		const {postId, voteType} = PostVoteValidator.parse(body)

		const session = await getAuthSession()

		if(!session?.user)
			return new Response('Unauthorized', {
				status: 401
			})

		const existedVote = await db.vote.findFirst({
			where: {
				userId: session.user.id,
				postId
			}
		})

		const post = await db.post.findUnique({
			where: {
				id: postId
			},

			include: {
				author: true,
				votes: true
			}
		})

		if(!post)
			return new Response('Post not found', {
				status: 404
			})

		if(existedVote){
			if(existedVote.type === voteType){
				await db.vote.delete({
					where: {
						userId_postId: {
							postId,
							userId: session.user.id
						}
					}
				})

				const votesAmount = post.votes.reduce((acc, vote) => {
					if(vote.type === 'UP')
						return acc + 1
					
					if(vote.type === 'DOWN')
						return acc - 1

					return acc
				}, 0)

				if(votesAmount >= CACHE_AFTER_UPVOTES) {
					const cachePayload: CachedPost = {
						authorUsername: post.author.username ?? '',
						content: JSON.stringify(post.content),
						id: post.id,
						title: post.title,
						currentVote: null,
						createdAt: post.createdAt
					}

					await redis.hset(`post:${postId}`, cachePayload)
				}

				return new Response('OK')
			}

			// if vote type is different, update the vote
			await db.vote.update({
				where: {
					userId_postId: {
						postId,
						userId: session.user.id
					}
				},

				data: {
					type: voteType
				}
			})

			const votesAmount = post.votes.reduce((acc, vote) => {
				if(vote.type === 'UP')
						return acc + 1
					
				if(vote.type === 'DOWN')
					return acc - 1

				return acc
			}, 0)

			if(votesAmount >= CACHE_AFTER_UPVOTES) {
				const cachePayload: CachedPost = {
					authorUsername: post.author.username ?? '',
					content: JSON.stringify(post.content),
					id: post.id,
					title: post.title,
					currentVote: null,
					createdAt: post.createdAt
				}

				await redis.hset(`post:${postId}`, cachePayload)
			}

			return new Response('update OK')
		}

		// if no existing vote, create a new vote
		await db.vote.create({
			data: {
				type: voteType,
				userId: session.user.id,
				postId
			}
		})

		const votesAmount = post.votes.reduce((acc, vote) => {
			if(vote.type === 'UP')
					return acc + 1
				
			if(vote.type === 'DOWN')
				return acc - 1

			return acc
		}, 0)

		if(votesAmount >= CACHE_AFTER_UPVOTES) {
			const cachePayload: CachedPost = {
				authorUsername: post.author.username ?? '',
				content: JSON.stringify(post.content),
				id: post.id,
				title: post.title,
				currentVote: null,
				createdAt: post.createdAt
			}

			await redis.hset(`post:${postId}`, cachePayload)
		}

		return new Response('Create OK')
	}catch(err){
		if(err instanceof z.ZodError)
			return new Response(err.message, {
				status: 400
			})

		return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
	}
}