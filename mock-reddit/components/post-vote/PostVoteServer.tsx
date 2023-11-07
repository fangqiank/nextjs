import {getAuthSession} from '@/lib/auth'
import type {Post, Vote} from '@prisma/client'
import { notFound } from 'next/navigation'
import { PostVoteClient } from './PostVoteClient'

type PostVoteServerProps = {
	postId: string,
	initVotesAmt?: number,
	initVote: Vote['type'] | null,
	getData?: () => Promise<(Post & {votes: Vote[]}) | null>
}

export const PostVoteServer = async ({postId, initVotesAmt, initVote, getData}: PostVoteServerProps) => {
	const session = await getAuthSession()

	let _votesAmt: number = 0
	let _curVote: Vote['type'] | null | undefined = undefined

	if(getData){
		const post = await getData()
		if(!post)
			return notFound()

		_votesAmt = post.votes.reduce((acc, v) => {
			if(v.type === 'UP')
				return acc + 1
			else if(v.type === 'DOWN')
				return acc - 1
			return acc
		}, 0)

		_curVote = post.votes.find(x => x.userId === session?.user?.id)?.type
	} else {
		_votesAmt = initVotesAmt!
		_curVote = initVote
	}

	return (
		<PostVoteClient
			postId={postId}
			initVotesAmt={_votesAmt}
			initVote={_curVote}
		/>
	)
}