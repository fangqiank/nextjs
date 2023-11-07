'use client'

import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation'
import { UserCard } from '@/components/UserCard'

const ClientPage = () => {
	const {data} = useSession({
		required: true,
		onUnauthenticated() {
			redirect(`/api/auth/signin?callbackUrl=/client`)
		}
	})

	// if(data?.user.role !== 'admin' && data?.user.role !== 'manager'){
	// 	return (
	// 		<h1 className="text-5xl">Access Denied</h1>
	// 	)
	// }

	if(!data?.user)
		return

	return (
		<section className="flex flex-col gap-6">
			<UserCard
				user ={data?.user}
				pagetype='Client' 
			/>
		</section>
	)
}

export default ClientPage