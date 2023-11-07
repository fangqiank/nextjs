'use client'

import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as LablePrimitive from '@radix-ui/react-label'
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

export const Label = forwardRef<ElementRef<typeof LablePrimitive.Root>, ComponentPropsWithoutRef<typeof LablePrimitive.Root> & VariantProps<typeof labelVariants>>(
	({className, ...props}, ref) => (
		<LablePrimitive.Root
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props} 
		/>
	)
)
Label.displayName = LablePrimitive.Root.displayName