'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {Form} from '../../components/Form'

const CreatePrompt = () => {
	const router = useRouter()
	const {data} = useSession()
	const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState(
		{ 
			prompt: "", 
			tag: "" 
		}
	)

	const createPrompt = async e => {
		e.preventDefault()

		setIsSubmitting(true)

		try{
			const res = await fetch('/api/prompt/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: post.prompt,
					userId: data?.user.id,
					tag: post.tag
				})
			})

			if(res.ok)
				router.push('/')
		}catch(err){
			console.error(err)
		}finally{
			setIsSubmitting(false)
		}
	}

	const contents = (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)

	return contents
}

export default CreatePrompt