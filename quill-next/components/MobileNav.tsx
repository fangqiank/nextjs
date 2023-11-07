'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type MobileNavProps = {
	isAuth: boolean
}

export const MobileNav = ({isAuth}: MobileNavProps) => {
	const [isOpen, setIsOpen] = useState(false)
	
	const toggleOpen = () => setIsOpen(prev => !prev)

	const pathName = usePathname()

	const closeOnCurrent = (href: string) => {
    if (pathName === href) {
      toggleOpen()
    }
  }

	useEffect(() => {
		if(isOpen)
			toggleOpen()
	}, [pathName])

	return (
		<div className='sm:hidden'>
			<Menu
				onClick={toggleOpen}
				className='relative z-50 h-5 w-5 text-zinc-700'
			/>

			{isOpen ? (
				<div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
					<ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
						{!isAuth ? (
							<>
								<li>
									<Link
										href='/sign-up'
										onClick={() => closeOnCurrent('/sign-up')}
										className='flex items-center w-full font-semibold text-green-600'
									>
										Get started
										<ArrowRight className='ml-2 h-5 w-5' />
									</Link>
								</li>

								<li className='my-3 h-px w-full bg-gray-300' />

								<li>
									<Link
										href='/sign-in'
										className='flex items-center w-full font-semibold'
										onClick={() => closeOnCurrent('/sign-in')}
									>
										Sign in
									</Link>
								</li>

								<li>
									<Link
										href='/pricing'
										className='flex items-center w-full font-semibold'
										onClick={() => closeOnCurrent('/pricing')}
									>
										Pricing
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
                  <Link
										className='flex items-center w-full font-semibold'
                    href='/dashboard'
                    onClick={() => closeOnCurrent('/dashboard')}
                  >
                    Dashboard
                  </Link>
                </li>

                <li className='my-3 h-px w-full bg-gray-300' />
                
								<li>
                  <Link
                    className='flex items-center w-full font-semibold'
                    href='/sign-out'>
                    Sign out
                  </Link>
                </li>
							</>
						)}
					</ul>
				</div>
			) : null}
		</div>
	)
}