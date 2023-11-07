'use client'

import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Image as ImageIcon, Link2 } from "lucide-react"
import { UserAvatar } from "./UserAvatar"
import type {Session} from 'next-auth'
import {usePathname, useRouter} from 'next/navigation'

type MiniCreatePostProps = {
	session: Session | null
}

export const MiniCreatePost = ({session}: MiniCreatePostProps) => {
	const router = useRouter()
	const pathName = usePathname()
	
	const contents = (
		<li className="overflow-hidden rounded-md bg-white shadow">
			<div className="h-full px-6 py-4 flex justify-between gap-6">
				<div className="relative">
					<UserAvatar
						user={{
							name: session?.user.name || null,
							image: session?.user.image || null
						}} 
					/>

					<span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
				</div>

				<Input 
					onClick={() => router.push(pathName + '/submit')}
					readOnly
					placeholder="Create post" 
				/>

				<Button
					onClick={() => router.push(pathName + '/submit')}
					variant='ghost'
				>
					<ImageIcon className="text-zinc-600"/>
				</Button>

				<Button
					onClick={() => router.push(pathName + '/submit')}
					variant='ghost'
				>
					<Link2 className="text-zinc-600" />
				</Button>
			</div>
		</li>
	)

	return contents
}