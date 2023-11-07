import Link from 'next/link'
import {UserButton, auth} from '@clerk/nextjs'

export const Header = ({username}) => {
	const {userId} = auth()

	const contents = (
		<nav className="flex items-center justify-between px-6 py-4 mb-5 bg-blue-700">
			<div className="flex items-center">
				<Link href='/'>
					<div className="text-lg font-bold text-white uppercase">
						Auth by clerk app
					</div>
				</Link>
			</div>

			<div className="flex items-center text-white">
				{!userId  && (
					<>
						<Link
							href='sign-in'
							className='text-gray-300 hover:text-white mr-4'
						>
							Sign In
						</Link>

						<Link
							href='sign-up'
							className='text-gray-300 hover:text-white mr-4'
						>
							Sign Up
						</Link>

						<Link
							href='register'
							className='text-gray-300 hover:text-white mr-4'
						>
							Register
						</Link>
					</>
				)}

				{userId && (
					<>
						<Link
							href='profile'
							className='text-gray-300 hover:text-white mr-4'
						>
							Profile
						</Link>

						<Link
							href='token'
							className='text-gray-300 hover:text-white mr-4'
						>
							Token
						</Link>
					</>
					
				)}

				<div className="ml-auto">
					<UserButton afterSignOutUrl='/' />
				</div>
			</div>
		</nav>
	)

	return contents
}
