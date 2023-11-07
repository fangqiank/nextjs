'use client'

import {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {Form} from '../../components/Form'

const UpdatePromptPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const promptId = searchParams.get('id')
	const [post, setPost] = useState(
		{ 
			prompt: "", 
			tag: "", 
		}
	)
  const [submitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const getDetail = async () => {
			const res = await fetch(`/api/prompt/${promptId}`)
			if(res.ok){
				const data = await res.json()

				setPost({
					prompt: data.prompt,
					tag: data.tag
				})
			}
		}

		if(promptId)  
			getDetail()
	}, [promptId])

	const updatePrompt = async e => {
		e.preventDefault()
		setIsSubmitting(true)

		if(!promptId)
			return alert('"Missing PromptId!')
		
		try{
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
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

	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	)
}

export default UpdatePromptPage
