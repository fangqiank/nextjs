import type {Post, Subreddit, User, Vote, Comment} from '@prisma/client'

export type ExtendedPost  = post & {
	subrddit: Subreddit,
	votes: Vote[],
	author: User,
	comments: Comment[]
}