'use client'

import React, { HTMLAttributes } from "react"
import Link from "next/link"
import type {User} from 'next-auth'
import {signOut} from 'next-auth/react'
import {DropdownMenu, DropdowenMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem} from './ui/DropdownMenu'
import { UserAvatar } from "./UserAvatar"

type UserAccountNavProps = HTMLAttributes<HTMLDivElement> & {
	user: Pick<User, 'name' | 'image' | 'email'>
}

export const UserAccountNav = ({user}: UserAccountNavProps) => {
	const contents = (
		<DropdownMenu>
			<DropdowenMenuTrigger>
				<UserAvatar
					user={{
						name: user.name || null,
						image: user.image || null
					}} 
				/>
			</DropdowenMenuTrigger>

			<DropdownMenuContent 
				className="bg-white"
				align="end"
			>
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.name && (
							<p className="font-medium">
								{user.name}
							</p>
						)}
						{user.email && (
							<p className="w-[200px] truncate text-sm text-muted-foreground">
								{user.email}
							</p>
						)}
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href='/'>Feed</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href='/settings'>Settings</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="cursor-pointer"
					onSelect={e => {
						e.preventDefault()

						signOut({
							callbackUrl: `${window.location.origin}/sign-in`
						})
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)

	return contents
}