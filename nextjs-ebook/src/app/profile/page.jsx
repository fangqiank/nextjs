'use client'

import {useSession} from 'next-auth/react'
import {useState ,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {Profile} from '../../components/Profile'

const ProfilePage = () => {
	const router = useRouter()
	const {data} = useSession()
	const [myPosts, setMyPosts] = useState([])

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`/api/users/${data?.user.id}/posts`)
			if(res.ok){
				const results = await res.json()
				setMyPosts(results)
			}	
		}	
		
		if(data?.user.id) fetchPosts()
	}, [data?.user.id])

	const handleEdit = post => {
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = async post => {
		const confirmed = confirm('Are you sure you want to delete this prompt?')

		if(confirmed){
			try{
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE'
				})

				const filteredPosts = myPosts.filter(item => item._id !== post._id)

				setMyPosts(filteredPosts)
			}catch(err){
				console.error(err)
			}
		}
	}
	
	const contents = (
		<Profile
			name={data?.user.name}
			desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, error.'
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}	 
		/>
	)

	return contents
}

export default ProfilePage