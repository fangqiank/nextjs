'use client'

import React from 'react'
import {X} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/Button'


export const CloseModel = () => {
	const router = useRouter()

	const contents = (
		<Button
			variant='subtle'
			className='h-6 w-6 p-0 rounded-md'
			onClick={() => router.back()}
		>
			<X 
				className='h-4 w-4'
				aria-label='close modal' 
			/>
		</Button>
	)
	return contents
}