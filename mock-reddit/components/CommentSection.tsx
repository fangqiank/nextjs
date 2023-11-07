'use client'

import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {Comment, CommentVote, User} from '@prisma/client'
import {CreateComment} from './CreateComment'
import {PostComment} from './comments/PostComment'

type ReplyComment = Comment & {
	votes: CommentVote[],
	author: User
}

type ExtendedComments = Comment & {
	votes: CommentVote[],
	author: User,
	replies: ReplyComment
}

type CommentSectionProps = {
	postId: string,
	comments: ExtendedComments[]
}

export const CommentSection = async ({postId}: CommentSectionProps) => {
	const session = await getAuthSession()

	const comments = await db.comment.findMany({
		where: {
			postId,
			replyToId: null
		}, 

		include: {
			author: true,
			votes: true,
			replies: {
				include: {
					author: true,
					votes: true
				}
			}
		}
	})

	const contents = (
		<div className="flex flex-col gap-y-4 mt-4">
			<hr className="w-full h-px my-6" />

			<CreateComment postId={postId} />

			<div className="flex flex-col gap-y-6 mt-4">
				{
					comments
						.filter(c => !c.replyToId)
						.map(topLevel => {
							const topLevelCommentVotesAmount = topLevel.votes.reduce(
								(acc, vote) => {
									if(vote.type === 'UP')
										return acc + 1
									if(vote.type === 'DOWN')
										return acc - 1

									return acc
								}, 0)

						const topLevelCommentVote = topLevel.votes.find(
							vote => vote.userId === session?.user.id
						)
						
						return (
							<div
								key={topLevel.id}
								className='flex flex-col'
							>
								<div className="mb-2">
									<PostComment
										comment={topLevel}
										curVote={topLevelCommentVote}
										votesAmount={topLevelCommentVotesAmount}
										postId={postId} 
									/>
								</div>

								{
									topLevel.replies
										.sort((a, b) => b.votes.length - a.votes.length)
										.map(reply => {
											const replyVotesAmount = reply.votes.reduce((acc, vote) => {
												if(vote.type === 'UP')
													return acc + 1
												if(vote.type === 'DOWN')
													return acc - 1

												return acc
										}, 0)

										const replyVote = reply.votes.find(
											vote => vote.userId === session?.user.id
										)

										return (
											<div
												key={reply.id}
												className='ml-2 py-2 pl-4 border-l-2 border-zinc-200'
											>
												<PostComment
													comment={reply}
													curVote={replyVote}
													votesAmount={replyVotesAmount}
													postId={postId} 
												/>
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		</div>
	)

	return contents
}