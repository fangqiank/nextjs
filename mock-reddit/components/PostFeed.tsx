'use client'

import {INFINITE_SCROLL_PAGINATION_RESULTS} from '@/config'
import {ExtendedPost} from '@/types/db'
import {useIntersection} from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import {Loader2} from 'lucide-react'
import { useEffect, useRef } from 'react'
import { PostComponent } from './Post'
import { useSession } from 'next-auth/react'

type PostFeedProps = {
	initPosts: ExtendedPost[],
	subredditName?: string
}

export const PostFeed = ({initPosts, subredditName}: PostFeedProps) => {
	const lastPostRef = useRef<HTMLElement>(null)
	const {ref, entry} = useIntersection({
		root: lastPostRef.current,
		threshold: 1
	})
	const {data: session} = useSession() 

	const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
		['infinite-query'],
		
		async ({pageParam = 1}) => {
			const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` + 
			(!!subredditName ? `&subredditName=${subredditName}` : '')

			const {data} = await axios.get(query)
			return data as ExtendedPost[]
		},

		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1
			},
			initialData: {
				pages: [initPosts],
				pageParams: [1]
			}
		}
	)

	useEffect(() => {
		if(entry?.isIntersecting)
			fetchNextPage()
	}, [entry, fetchNextPage])

	const posts = data?.pages.flatMap(p => p) ?? initPosts

	const contents = (
		<ul className="flex flex-col col-span-2 space-y-6">
			{posts.map((post, idx) => {
				const votesAmt = post.votes.reduce((acc, vote) => {
					if(vote.type === 'UP')
						return acc + 1
					else if(vote.type === 'DOWN')
						return acc - 1

					return acc
				}, 0)

				const curVote = post.votes.find(v => v.userId === session?.user?.id)

				if(idx === posts.length -1){
					return (
						<li
							key={post.id}
							ref={ref}
						>
							<PostComponent
								post={post}
								commentAmount={post.comments.length}
								subredditName={post.subreddit.name}
								votesAmount={votesAmt}
								curVote={curVote} 
							/>
						</li>
					)
				}else{
					return (
						<PostComponent
							key={post.id}
							post={post}
							commentAmount={post.comments.length}
							subredditName={post.subreddit.name}
							votesAmount={votesAmt}
							curVote={curVote} 
						/>
					)
				}
			})}

			{isFetchingNextPage && (
				<li className="flex justify-center">
					<Loader2 className='w-6 h-6 text-zinc-500 animate-spin'/>
				</li>
			)}
		</ul>
	)

	return contents
}