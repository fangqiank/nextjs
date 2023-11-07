'use client'

import React from 'react'
import Image from 'next/image'

type User = {
	name?: string | null | undefined,
	email?: string | null | undefined,
	image: string | null | undefined,
} | undefined

interface UserCardProps {
	user: User,
	pagetype: string
}

export const UserCard = ({user, pagetype}: UserCardProps) => {
	const greeting = user?.name ? (
		<div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
			Hello {user?.name}
		</div>
	) : null

	const userImage = user?.image ? (
		<Image
			className='border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8'
			src={user?.image}
			width={200}
			height={200}
			alt={user?.name ?? 'profile image'}
			priority={true} 
		/>
	) : null

	return (
		<section className='flex flex-col gap-4'>
			{greeting}
			{userImage}
			<p className="text-2xl text-center">
				{pagetype} Page!
			</p>
		</section>
	)
}