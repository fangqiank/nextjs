import {getAuthSession} from '@/lib/auth'
import {db} from '@/lib/db'
import {z} from 'zod'

export const GET = async (req: Request) => {
	const url = new URL(req.url)

	const session = await getAuthSession()

	let followedCommunitiesIds: string[] = []

	if(session){
		const followedCommunities = await db.subscription.findMany({
			where: {
				userId: session.user.id
			},

			include: {
				subreddit: true
			}
		})

		followedCommunitiesIds = followedCommunities.map(sub => sub.subreddit.id)
	}

	try{
		const {limit, page, subredditName} = z.object({
			limit: z.string(),
			page: z.string(),
			subredditName: z.string().nullish().optional()
		})
		.parse({
			limit: url.searchParams.get('limit'),
			page: url.searchParams.get('page'),
			subredditName: url.searchParams.get('subredditName')
		})

		let whereClause = {}

		if(subredditName) {
			whereClause = {
				subreddit: {
					name: subredditName
				}
			}
		}else if(session){
			whereClause = {
				subreddit: {
					id: {
						in: followedCommunitiesIds
					}
				}
			}
		}

		const posts = await db.post.findMany({
			take: parseInt(limit),
			skip: (parseInt(page) - 1) * parseInt(limit),
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				subreddit: true,
				votes: true,
				author: true,
				comments: true
			},
			where: whereClause
		})

		return new Response(JSON.stringify(posts))
	}catch(err){
		return new Response(`Could not fetch posts`, {
			status: 500
		})
	}

}