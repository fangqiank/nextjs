import {redirect} from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { Comment } from '@/components/forms/Comment'
import { ThreadCard } from '@/components/cards/ThreadCard'
import { fetchUser } from '@/lib/actions/user.actions'
import { fetchThreadById } from '@/lib/actions/thread.actions'

export const revalidate = 0

type ThreadPageProps = {
	params: {
		id: string
	}
}

const ThreadPage = async ({params: {id}}: ThreadPageProps) => {
	if(!id)
		return null

	const user = await currentUser()

	if(!user)
		return null

	const userInfo = await fetchUser(user.id)
	
	if(!userInfo?.onboarded)
		redirect('/onboarding')

	const thread = await fetchThreadById(id)
	// console.log("thread: ",  thread);

	const contents = (
		<section className="relative">
			<div>
				<ThreadCard
					id={thread._id}
					currentUserId={user.id}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children} 
				/>
			</div>

			<div className="mt-7">
				<Comment
					threadId={id}
					currentUserId={JSON.stringify(userInfo._id)}
					currentUserImg={user.imageUrl} 
				/>
			</div>

			<div className="mt-10">
				{thread.children.map((item: any) => (
					<ThreadCard
						key={item._id}
						id={item._id}
						currentUserId={user.id}
						parentId={item.parentId}
						content={item.text} 
						author={item.author}
						community={item.community}
						createdAt={item.createdAt}
						comments={item.children}
						isComment
					/>
				))}
			</div>
		</section>
	)

	return contents
}

export default ThreadPage