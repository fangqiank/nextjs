'use client'

import { cn } from '@/lib/utils'
import {DialogProps} from '@radix-ui/react-dialog'
import {Command as CommandPrimitive} from 'cmdk'
import {Loader2, Search} from 'lucide-react'
import React, {forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes} from 'react'
import {Dialog, DialogContent} from '@/components/ui/Dialog'

export const Command = forwardRef<ElementRef<typeof CommandPrimitive>, ComponentPropsWithoutRef<typeof CommandPrimitive>>(
	({className, ...props}, ref) => (
		<CommandPrimitive
			ref={ref}
			className={cn('flex w-full h-full flex-col overflow-hidden rounded-md text-popover-foreground bg-popover', className)}
			{...props} 
		/>
	)
)
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps{}

export const CommandDialog = ({children, ...props}: CommandDialogProps) => (
	<Dialog {...props}>
		<DialogContent className='overflow-hidden p-0 shadow-2xl'>
			<Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
				{children}
			</Command>
		</DialogContent>
	</Dialog>
)

export const CommandInput = forwardRef<ElementRef<typeof CommandPrimitive.Input>, ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
	isLoading: boolean
}>(
	({className, isLoading, ...props}, ref) => (
		<div 
			className='flex items-center border-b px-3'
			cmdk-input-wrapper=''
		>
			{isLoading ? (
				<Loader2 className='mr-2 h-4 w-4 shrink-0 opacity-50 animate-spin'/>
			) : (
				<Search className='mr-2 h-4 w-4 shrink-0 opacity-50'/>
			)}
			<CommandPrimitive.Input
				ref={ref}
				className={cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className)}
				{...props} 
			/>
		</div>
	)
)
CommandInput.displayName = CommandPrimitive.Input.displayName

export const CommandList = forwardRef<ElementRef<typeof CommandPrimitive.List>, ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(
	({className, ...props}, ref) => (
		<CommandPrimitive.List
			ref={ref}
			className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
			{...props} 
		/>
	)
)
CommandList.displayName = CommandPrimitive.List.displayName

export const CommandEmpty = forwardRef<ElementRef<typeof CommandPrimitive.Empty>, ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(
	(props, ref) => (
		<CommandPrimitive.Empty
			ref={ref}
			className='py-6 text-center text-sm'
			{...props} 
		/>
	)
)
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

export const CommandGroup = forwardRef<ElementRef<typeof CommandPrimitive.Group>, ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(
	({className, ...props}, ref) => (
		<CommandPrimitive.Group
			ref={ref}
			className={cn('overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', className)}
			{...props}
		/>
	)
)
CommandGroup.displayName = CommandPrimitive.Group.displayName

export const CommandSeperator = forwardRef<ElementRef<typeof CommandPrimitive.Separator>, ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(
	({className, ...props}, ref) => (
		<CommandPrimitive.Separator
			ref={ref}
			className={cn('-mx-1 h-px bg-border', className)}
			{...props} 
		/>
	)
)
CommandSeperator.displayName = CommandPrimitive.Separator.displayName

export const CommandItem = forwardRef<ElementRef<typeof CommandPrimitive.Item>, ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(
	({className, ...props}, ref) => (
		<CommandPrimitive.Item
			ref={ref}
			className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className)}
			{...props} 
		/>
	)
)
CommandItem.displayName = CommandPrimitive.Item.displayName

export const CommandShortcut = ({className, ...props}: HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
		{...props}
	/>
)
CommandShortcut.displayName = 'CommandShortcut' 