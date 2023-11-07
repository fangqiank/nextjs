import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { UserCard } from "@/components/cards/UserCard"
import { SearchBar } from "@/components/shared/SearchBar"
import { Pagination } from "@/components/shared/Pagination"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"

type SearchPageProps = {
	searchParams: {
		[key: string]: string | undefined
	}
}

const SearchPage = async ({searchParams}: SearchPageProps) => {
	const user = await currentUser()

	if(!user)
		return null

	const userInfo = await fetchUser(user.id)

	if(!userInfo?.onboarded)
		redirect('/onboarding')

	const result = await fetchUsers({
		userId: user.id,
		searchString: searchParams.q,
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: 25
	})	

	const contents = (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			<SearchBar routeType="search"/>

			<div className="mt-14 flex flex-col gap-9">
				{result.users.length === 0 ? (
					<p className="no-result">No Result</p>
				) : (
					<>
						{result.users.map(user => (
							<UserCard
								key={user.id}
								id={user.id}
								name={user.name}
								username={user.username}
								imgUrl={user.image}
								personType="User" 
							/>
						))}
					</>
				)}
			</div>

			<Pagination
				path="search"
				pageNumber={searchParams?.page ? +searchParams.page : 1}
				isNext={result.isNext} 
			/>
		</section>
	)

	return contents
}

export default SearchPage