import Image from "next/image"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"
import {redirect} from 'next/navigation'
import { fetchUser, getReplies } from "@/lib/actions/user.actions"

const RepliesPage = async () => {
	const user = await currentUser()
	
	if(!user)
		return null

	const userInfo = await fetchUser(user.id)

	if(!userInfo?.onboarded)
		redirect('/onboarding')

	const replies	= await getReplies(userInfo._id)

	const contents = (
		<>
			<h1 className="head-text">Replies</h1>

			<section className="mt-10 flex flex-col gap-5">
				{replies.length > 0 ? (
					<>
						{replies.map(reply => (
							<Link
								key={reply._id}
								href={`/thread/${reply.parentId}`}
							>
								<article className="activity-card">
									<Image
										src={reply.author.image}
										alt='user logo'
										width={20}
										height={20}
										className="rounded-full object-cover" 
									/>

									<p className="!text-small-regular text-light-1">
										<span className="mr-1 text-primary-500">
											{reply.author.name}
										</span>{' '}
										replied to your thread
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<p className="!text-base-regular text-light-3">No replies yet</p>
				)}
			</section>
		</>
	)

	return contents
}

export default RepliesPage