import { currentUser } from "@clerk/nextjs"
import {redirect} from 'next/navigation'
import { SearchBar } from "@/components/shared/SearchBar"
import { Pagination } from "@/components/shared/Pagination"
import { CommunityCard } from "@/components/cards/CommunityCard"
import { fetchUser } from "@/lib/actions/user.actions"
import { fetchCommunities } from "@/lib/actions/community.actions"

type CommunitiesPageProps = {
	searchParams: { 
		[key: string]: string | undefined 
	}
}

const CommunitiesPage = async ({searchParams}: CommunitiesPageProps) => {
	const user = await currentUser()

	if(!user)
		return null

	const userInfo = await fetchUser(user.id)
	
	if(!userInfo?.onboarded)
		redirect('/onboarding')

		const result = await fetchCommunities({
			searchStr: searchParams.q,
			pageNum: searchParams?.page ? +searchParams.page : 1,
			pageSize: 25
		})

	const contents = (
		<>
			<h1 className="head-text">Communities</h1>

			<div className="mt-5">
				<SearchBar routeType="communities" />
			</div>

			<section className="mt-9 flex flex-wrap gap-4">
				{result.communities.length === 0 ? (
					<p className="no-result">No Result</p>
				) : (
					<>
						{result.communities.map(community => (
							<CommunityCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								imgUrl={community.image}
								bio={community.bio}
								members={community.members} 
							/>
						))}
					</>
				)}
			</section>

			<Pagination
				path="communities"
				pageNumber={searchParams?.page ? +searchParams.page : 1}
				isNext={result.isNext} 
			/>
		</>
	)

	return contents
}

export default CommunitiesPage