import getUserPosts from "@/lib/getUserPosts";
import getUser from "@/lib/getUser";
import {Suspense} from 'react'
import { UserPosts } from "@/app/components/UserPosts"
import type { Metadata } from "next";

type Params ={
	params: {
		userId: string
	}
}

export const generateMetadata = async ({params: {userId}}: Params): Promise<Metadata> => {
	const userData: Promise<User> = getUser(userId)
	const user: User = await userData
	
	return {
		title: user.name,
		description: `This is teh page of ${user.name}`
	}
}

const UserPage = async ({params: {userId}}: Params) => {
	const userData: Promise<User> = getUser(userId)
	const userPostsData: Promise<Post[]> = getUserPosts(userId)

	// const [user, userPosts] = await Promise.all([userData, userPostsData])
	
	const user = await userData

	return (
		<>
			<h1>{user.name}</h1>
			<br />
			<Suspense fallback={<h2>Loading...</h2>}>
				{/* @ts-expect-error Server Component */}
				<UserPosts promise={userPostsData} />
			</Suspense>
		</>
	)
}

export default UserPage
