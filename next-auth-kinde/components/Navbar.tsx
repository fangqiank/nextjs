import React from 'react'
import Image from 'next/image'

import {
	getKindeServerSession,
	RegisterLink,
	LoginLink,
	LogoutLink
} from '@kinde-oss/kinde-auth-nextjs/server'

export const Navbar = () => {
	const {isAuthenticated, getUser} = getKindeServerSession()
	const user = getUser()

	const contents = (
		<nav className='flex justify-between items-center py-6 font-bold w-4/5 mx-auto bg-white'>
			<h1 className="text=3xl">KindeAuth</h1>
			<div className="flex gap-4 items-center">
				{!isAuthenticated() ? (
					<>
						<LoginLink className='bg-black text-white px-4 py-2 rounded' >Sign In</LoginLink>
						<RegisterLink className='bg-black text-white px-4 py-2 rounded'>Sign Up</RegisterLink>
					</>
				) :  (
					<div className="flex gap-4 font-normal">
						{user?.picture ? (
							<Image
								className='rounded-full'
								src={user?.picture}
								width={55}
								height={55}
								alt='profile avatar' 
							/>
						) : (
							<div className="bg-balck text-white rounded-full p-4">
								{user?.given_name?.[0]}
								{user?.family_name?.[0]}
							</div>
						)}

						<div>
							<p className="text-2xl">
								{user?.given_name} {user?.family_name}
							</p>

							<LogoutLink className='text-black'>Logout</LogoutLink>
						</div>
					</div>
				)}
			</div>
		</nav>
	)

	return contents
}