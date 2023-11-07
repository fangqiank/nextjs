import type { Metadata } from "next"
import getAllUsers from '@/lib/getAllUsers'
import Link from "next/link";

export const metadate: Metadata ={
	title: 'Users'
}

const UsersPage = async () => {
	const usersData: Promise<User[]> = getAllUsers()
	// console.log(usersData)	
	const users = await usersData

	const content = (
		<section>
			<h2>
				<Link href='/'>Back to Home</Link>
			</h2>
			<br />
			{users.map(user => (
				<>
					<p key={user.id}>
						<Link href={`/users/${user.id}`}>{user.name}</Link>
					</p>
					<br />
				</>
			))}
		</section>
	)
	return content
};

export default UsersPage
