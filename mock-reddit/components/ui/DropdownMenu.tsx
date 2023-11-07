'use client'

import React, {ComponentPropsWithoutRef, ElementRef, forwardRef, HTMLAttributes} from 'react'
import * as DropddownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {Check, ChevronRight, Circle} from 'lucide-react'
import { cn } from '@/lib/utils'

export const DropdownMenu = DropddownMenuPrimitive.Root

export const DropdowenMenuTrigger = DropddownMenuPrimitive.Trigger

export const DropdownMenuGroup = DropddownMenuPrimitive.Group

export const  DropdownMenuPortal = DropddownMenuPrimitive.Portal

export const DropdownMenuSub = DropddownMenuPrimitive.Sub

export const DropdownMenuRadioGroup = DropddownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = forwardRef<ElementRef<typeof DropddownMenuPrimitive.SubTrigger>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.SubTrigger> & {inset?: boolean}>(
	({className, children, inset, ...props}, ref) => (
		<DropddownMenuPrimitive.SubTrigger
			ref={ref}
			className={cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",className)}
			{...props} 
		>
			{children}
			<ChevronRight className='ml-auto h-4 w-4' />
		</DropddownMenuPrimitive.SubTrigger>
	)
)
DropdownMenuSubTrigger.displayName = DropddownMenuPrimitive.SubTrigger.displayName

export const DropdownMenuSubContent = forwardRef<ElementRef<typeof DropddownMenuPrimitive.SubContent>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.SubContent>>(
	({className, ...props}, ref) => (
		<DropddownMenuPrimitive.SubContent
			ref={ref}
			className={cn('"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',className)} 
			{...props}
		/>
	)
)
DropdownMenuSubContent.displayName = DropddownMenuPrimitive.SubContent.displayName

export const DropdownMenuContent = forwardRef<ElementRef<typeof DropddownMenuPrimitive.Content>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.Content>>(
	({className, sideOffset = 4, ...props}, ref) => (
		<DropddownMenuPrimitive.Content
			ref={ref}
			className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className)}
			{...props} 
		/>
	)
)
DropdownMenuContent.displayName = DropddownMenuPrimitive.Content.displayName

export const DropdownMenuItem = forwardRef<ElementRef<typeof DropddownMenuPrimitive.Item>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.Item> & {inset?: boolean}>(
	({className, inset, ...props}, ref) => (
		<DropddownMenuPrimitive.Item 
			ref={ref}
			className={cn("relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className)}
			{...props}
		/>
	)
)
DropdownMenuItem.displayName = DropddownMenuPrimitive.Item.displayName

export const DropdownMenuCheckboxItem = forwardRef<ElementRef<typeof DropddownMenuPrimitive.CheckboxItem>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.CheckboxItem>>(
	({className, children, checked, ...props}, ref) => (
		<DropddownMenuPrimitive.CheckboxItem
			ref={ref}
			className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className)}
			checked={checked}
			{...props} 
		>
			<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
				<DropddownMenuPrimitive.ItemIndicator>
					<Check className='h-4 w-4' />
				</DropddownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropddownMenuPrimitive.CheckboxItem>
	)
)
DropdownMenuCheckboxItem.displayName = DropddownMenuPrimitive.CheckboxItem.displayName


export const DropdownMenyRadioItem = forwardRef<ElementRef<typeof DropddownMenuPrimitive.RadioItem>,
ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.RadioItem>>(
	({className, children, ...props}, ref) => (
		<DropddownMenuPrimitive.RadioItem
			ref={ref}
			className={cn( "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<DropddownMenuPrimitive.ItemIndicator>
					<Circle className='h-2 w-2 fill-current'/>
				</DropddownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropddownMenuPrimitive.RadioItem>
	)
)
DropdownMenyRadioItem.displayName = DropddownMenuPrimitive.RadioItem.displayName

export const DropdownMenuLabel = forwardRef<ElementRef<typeof DropddownMenuPrimitive.Label>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.Label> & {inset?:boolean}>(
	({className, inset, ...props}, ref) => (
		<DropddownMenuPrimitive.Label
			ref={ref}
			className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
			{...props} 
		/>
	)
)
DropdownMenuLabel.displayName = DropddownMenuPrimitive.Label.displayName

export const DropdownMenuSeparator = forwardRef<ElementRef<typeof DropddownMenuPrimitive.Separator>, ComponentPropsWithoutRef<typeof DropddownMenuPrimitive.Separator>>(
	({className, ...props}, ref) => (
		<DropddownMenuPrimitive.Separator
			ref={ref}
			className={cn('-mx-1 my-1 h-px bg-muted', className)}
			{...props} 
		/>
	)
)
DropdownMenuSeparator.displayName = DropddownMenuPrimitive.Separator.displayName

export const DropdownMenuShortcut = ({className, ...props}: HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
		{...props}
	/>
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'