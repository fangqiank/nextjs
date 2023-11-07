import {INFINITE_SCROLL_PAGINATION_RESULTS} from '@/config'
import React from 'react'
import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {PostFeed} from '../PostFeed'
import {notFound} from 'next/navigation'

export const CustomFeed = async () => {
	const session  = await getAuthSession()

	if(!session)
		return notFound()

	const followedCommunities = await db.subscription.findMany({
		where: {
			userId: session.user.id
		},

		include: {
			subreddit: true
		}
	})
	
	const posts = await db.post.findMany({
		where: {
			subreddit: {
				name: {
					in: followedCommunities.map(comm => comm.subreddit.name)
				},
			}
		},

		orderBy: {
			createdAt: 'desc'
		},

		include: {
			votes: true,
			author: true,
			comments: true,
			subreddit: true
		},

		take: INFINITE_SCROLL_PAGINATION_RESULTS
	})

	return (
		<PostFeed initPosts={posts}/>
	)
}