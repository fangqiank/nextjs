'use client'

import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactElement } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/lib/utiles' 
import {X} from 'lucide-react'

export const ToastProvider = ToastPrimitive.Provider

export const ToastViewport = forwardRef<ElementRef<typeof ToastPrimitive.Viewport>, ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(
	({className, ...props}, ref) => (
		<ToastPrimitive.Viewport
			ref={ref}
			className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className)} 
			{...props}
		/>
	)
)
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
	"data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
  {
		variants: {
			variant: {
				default: 'bg-background border',
				destructive: 'group destructive border-destructive bg-destructive text-destructive-foreground'
			}
		},

		defaultVariants: {
			variant: 'default'
		}
	}
)

export const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitive.Root.displayName


export const ToastAction = forwardRef<ElementRef<typeof ToastPrimitive.Action>, ComponentPropsWithoutRef<typeof ToastPrimitive.Action>>(
	({className, ...props}, ref) => (
		<ToastPrimitive.Action
			ref={ref}
			className={cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className)}
			{...props} 
		/>
	)
)
ToastAction.displayName = ToastPrimitive.Action.displayName

export const ToastClose = forwardRef<ElementRef<typeof ToastPrimitive.Close>, ComponentPropsWithoutRef<typeof ToastPrimitive.Close>>(
	({className, ...props}, ref) => (
		<ToastPrimitive.Close
			ref={ref}
			className={cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className)} 
			{...props}
		>
			<X className="h-4 w-4" />
		</ToastPrimitive.Close>
	)
)
ToastClose.displayName = ToastPrimitive.Close.displayName

export const ToastTitle = forwardRef<ElementRef<typeof ToastPrimitive.Title>, ComponentPropsWithoutRef<typeof ToastPrimitive.Title>>(
	({className, ...props}, ref) => (
		<ToastPrimitive.Title
			ref={ref}
			className={cn("text-sm font-semibold", className)} 
			{...props}
		/>
	)
)
ToastTitle.displayName = ToastPrimitive.Title.displayName

export const ToastDescription = forwardRef<ElementRef<typeof ToastPrimitive.Description>, ComponentPropsWithoutRef<typeof ToastPrimitive.Description>>(
	({className, ...props}, ref) => (
		<ToastPrimitive.Description
			ref={ref}
			className={cn("text-sm opacity-90", className)}
			{...props} 
		/>
	)
)
ToastDescription.displayName = ToastPrimitive.Description.displayName

export type ToastProps = ComponentPropsWithoutRef<typeof Toast>

export type ToastActionElement = ReactElement<typeof ToastAction>


