'use client'

import {cn} from '@/lib/utils'
import {signIn} from 'next-auth/react'
import React, {HTMLAttributes, useState} from 'react'
import { Button } from './ui/Button'
import {useToast} from '@/hooks/use-toast'
import { Icons } from './Icons'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement> & {}

export const UserAuthForm = ({className, ...props}: UserAuthFormProps) => {
	const {toast} = useToast()
	const [isLoading, setIsLoading] = React.useState<boolean>(false)

	const loginWithGoogle = async () => {
		setIsLoading(true)

		try{
			await signIn('google')
		}catch(err){
			toast({
				title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
			})
		}finally{
			setIsLoading(false)
		}
	}

 	return (
		<div 
			className={cn('flex justify-center', className)}
			{...props}
		>
			<Button
				isLoading={isLoading}
				type='button'
				size='sm'
				className='w-full'
				onClick={loginWithGoogle}
				disabled={isLoading}
			>
				{isLoading ? null : (
					<Icons.google className='h04 w-4 mr-2'/>
				)} 
				Google
			</Button>
		</div>
	)
}