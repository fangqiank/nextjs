import Link from "next/link"
import { FormGroup } from "@/components/FormGroup"
import {revalidateTag} from 'next/cache'
import {redirect} from 'next/navigation'

const createPost = async (data) =>{
	'use server'
	const title = data.get('title')
	const body = data.get('body')
	console.log('On the server!')

	await fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title, body})
	})

	revalidateTag('posts')
	redirect('/')
} 

const NewPostForm = () => {
	const contents = (
		<form action={createPost}>
			<div className="form-row">
				<FormGroup>
					<label htmlFor="title">Title</label>
					<input 
						type="text"
						name='title'
						id='title' 
					/>
				</FormGroup>
			</div>

			<div className="form-row">
				<FormGroup>
					<label htmlFor="body">Body</label>
					<textarea 
						name='body'
						id='body' 
					/>
				</FormGroup>
			</div>

			<div className="form-row form-btn-row">
				<Link
					className="btn btn-outline"
					href='..'
				>
					Cancel
				</Link>
			</div>
		</form>
	)
}

export default NewPostForm