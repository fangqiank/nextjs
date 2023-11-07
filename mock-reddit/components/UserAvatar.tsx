'use client'

import {User} from '@prisma/client'
import {AvatarProps} from '@radix-ui/react-avatar'
import Image from 'next/image'
import {Avata, AvatarFallback} from './ui/Avata'
import {Icons} from './Icons'

type UserAvatarProps = AvatarProps & {
	user: Pick<User, 'image' | 'name'>
}

export const UserAvatar = ({user, ...props}: UserAvatarProps) => {
	const contents = (
		<Avata {...props}>
			{user.image ? (
				<div className="relative aspect-square h-full w-full">
					<Image
						fill
						src={user.image}
						alt='profile image'
						referrerPolicy='no-referrer' 
					/>
				</div>
			) : (
				<AvatarFallback>
					<span className="sr-only">{user?.name}</span>
					<Icons.user className='h-4 w-4' />
				</AvatarFallback>
			)}
		</Avata>
	)

	return contents
}