'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { trpc } from '@/app/_trpc/client'

export const UpgradeButton = () => {
	const {mutate} = trpc.createStripeSession.useMutation({
		onSuccess: ({url}) => {
			window.location.href = url ?? '/dashboard/billing'
		}
	})

	return (
		<Button
			className='w-full' 
			onClick={() => mutate}
		>
			Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
		</Button>
	)
}
