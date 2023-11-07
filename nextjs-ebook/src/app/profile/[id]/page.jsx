'use client'

import {useState, useEffect} from 'react'
import {useSearchParams} from 'next/navigation'

import { Profile } from '../../../components/Profile'

const UserProfile = ({params}) => {
	const searchParam = useSearchParams()
	const username = searchParam.get('name')
  console.log(username);
	const [userPosts, setUserPosts] = useState([])
	
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`/spi/users/${params?.id}/posts`)
			const data = await res.json()
			setUserPosts(data)
		}

		if(params?.id) fetchPosts()
	}, [params.id])

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username}'s profile page.`}
			data={userPosts} 
		/>
	)
}

export default UserProfile