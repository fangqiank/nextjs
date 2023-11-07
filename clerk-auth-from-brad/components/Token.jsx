'use client'

import React from 'react'
import {useAuth} from '@clerk/nextjs'

export const Token = () => {
	const {getToken} = useAuth()
  const token = getToken()
	
	return (
		<>
			<span className='... break-all'>{token}</span>
		</>
	)
}
