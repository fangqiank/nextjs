import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { UserCard } from '@/components/UserCard'
import { redirect } from 'next/navigation'

type Props = {}

const ServerPage =  async () => {
	const session = await getServerSession()
	
	if(!session)
		redirect(`/api/auth/signin?callbackUrl=/serve`)

	return (
		<section className='flex flex-col gap-6'>
			<UserCard
				user={session?.user}
				pagetype='Server' 
			/>
		</section>
	)
}

export default ServerPage