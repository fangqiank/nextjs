import { SubscribeLeaveToggle } from "@/components/SubscribeLeaveToggle"
import { ToFeedButton } from "@/components/ToFeedButton"
import { buttonVariants } from "@/components/ui/Button"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import {format} from 'date-fns'
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

export const metadata: Metadata ={
	title: 'Mock Reddit',
	description: 'Created by nextjs 13'
}

type props = {
	children: ReactNode,
	params: {
		slug: string
	}
}

const layout = async({children, params: {slug}}: props) => {
	const session = await getAuthSession()

	const subreddit = await db.subreddit.findFirst({
		where: {
			name: slug
		},

		include: {
			posts: {
				include:{
					author: true,
					votes: true
				}
			}
		}
	})

	const subscrition = !session?.user 
		? undefined
		: await db.subscription.findFirst({
			where: {
				subreddit: {
					name: slug
				},

				user: {
					id: session.user.id
				}
			}
		})

	const isSubscribed = !!subscrition

	if(!subreddit)
		return notFound()

	const memeberCount = await db.subscription.count({
		where: {
			subreddit: {
				name: slug
			}
		}
	})
		
	const contents = (
		<div className="sm:container max-w-7xl mx-auto h-full pt-12">
			<div>
				<ToFeedButton />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
					<ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

						<div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
							<div className="px-6 py-4">
								<p className="font-semibold py-3">About r/{subreddit.name}</p>
							</div>

							<dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
								<div className="flex justify-between gap-x-4 py-3">
									<dt className="text-gray-500">Created</dt>
									<dd className="text-gray-700">
										<time dateTime={subreddit.createdAt.toDateString()}>
											{format(subreddit.createdAt, 'MMMM d, yyyy')}
										</time>
									</dd>
								</div>

								<div className="flex justify-between gap-x-4 py-3">
									<dt className="text-gray-500">Members</dt>
									<dd className="flex items-start gap-x-2">
										<div className="text-gray-900">{memeberCount}</div>
									</dd>
								</div>

								{subreddit.creatorId === session?.user?.id ? (
									<div className="flex justify-between gap-x-4 py-3">
										<dt className="text-gray-500">You created this community</dt>
									</div>
								) : null}

								{subreddit.creatorId !== session?.user?.id ? (
									<SubscribeLeaveToggle
										isSubscribed={isSubscribed}
										subredditId={subreddit.id}
										subredditName={subreddit.name} 
									/>
								) : null}

								<Link
									href={`r/${slug}/submit`}
									className={buttonVariants({
										variant: 'outline',
										className: 'w-full mb-6'
									})}
								>
									Create Post
								</Link>
							</dl>
						</div>
			  </div>
			</div>
		</div>
	)

	return contents
}

export default layout