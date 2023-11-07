import React from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {LoginLink, RegisterLink, getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'
import {ArrowRight} from 'lucide-react'	
import { UserAccountNav } from "./UserAccountNav"

export const Navbar = () => {
	const {getUser} = getKindeServerSession()
	const user = getUser()

	return (
		<nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-14 items-center justify-between border-b border-zinc-200">
					<Link 
						href='/'
						className="flex z-40 font-semibold"
					>
						Quill
					</Link>

					<div className="hidden items-center space-x-4 sm:flex">
						{user ? (
							<>
								<Link 
									className={buttonVariants({
										variant:'ghost',
										size: 'sm'
									})}
									href='/prcing'
								>
									Pricing
								</Link>

								<LoginLink
									className={buttonVariants({
										variant: 'ghost',
										size: 'sm'
									})}
								>
									Sign in
								</LoginLink>

								<RegisterLink
									className={buttonVariants({
										size: 'sm'	
									})}
								>
									Get started <ArrowRight className="ml-1.5 h-5 w-5" />
								</RegisterLink>
							</>	
						) : (
							<>
								<Link 
									href='/dashboard'
									className={buttonVariants({
										variant: 'ghost',
										size: 'sm'
									})}
								>
									Dashboard
								</Link>

								{/* <UserAccountNav
									name={
										!user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
									} 
									email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
								/> */}
							</>
						)}
						
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	)
};
	