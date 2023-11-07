'use client'

import {ChevronLeft} from 'lucide-react'
import {usePathname} from 'next/navigation'
import {buttonVariants} from './ui/Button'

const getSubredditPath = (path: string) => {
	const splitPath = path.split('/')

	if(splitPath.length === 3)
		return '/'
	else if(splitPath.length > 3)
		return `/${splitPath[1]}/${splitPath[2]}`
	else 
		return '/'
}

export const ToFeedButton = () => {
	const pathName = usePathname()

	const subredidditPath = getSubredditPath(pathName)

	return (
		<a 
			href={subredidditPath}
			className={buttonVariants({
				variant: 'ghost'
			})}
		>
			<ChevronLeft className='h-4 w-4 mr-1'/>
			{subredidditPath === '/' ? 'Back home' : 'Back to community'}
		</a>
	)
}