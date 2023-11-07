'use client'

import React, {forwardRef, ElementRef, ComponentPropsWithoutRef} from 'react'
import * as AvartarPrimitive from '@radix-ui/react-avatar'

import {cn} from '@/lib/utils'

type Props = {}

export const Avata = forwardRef<
		ElementRef<typeof AvartarPrimitive.Root>, 
		ComponentPropsWithoutRef<typeof AvartarPrimitive.Root>
	>(({className, ...props}, ref) => {
	return (
		<AvartarPrimitive.Root
			ref={ref}
			className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
			className)}
			{...props}
		/>
	)
	})
	Avata.displayName = AvartarPrimitive.Root.displayName

	export const AvatarImage = forwardRef<
		ElementRef<typeof AvartarPrimitive.Image>,
		ComponentPropsWithoutRef<typeof AvartarPrimitive.Image>
		>(
			({className, ...props}, ref) => (
				<AvartarPrimitive.Image
					ref={ref}
					referrerPolicy='no-referrer'
					className={cn('aspect-square h-full w-full', className)}
					{...props}
				/>
			)
	)
	AvatarImage.displayName = AvartarPrimitive.Image.displayName

	export const AvatarFallback = forwardRef<
				ElementRef<typeof AvartarPrimitive.Fallback>,
				ComponentPropsWithoutRef<typeof AvartarPrimitive.Fallback>
	> (
		({className, ...props}, ref) => (
			<AvartarPrimitive.Fallback
				ref={ref}
				className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
				{...props} 
			/>
		)
	)
	AvatarFallback.displayName = AvartarPrimitive.Fallback.displayName