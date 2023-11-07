'use client'

import { useRouter } from "next/navigation"
import {useState, useTransition, FormEvent, ChangeEvent} from 'react'
import { usePathname } from "next/navigation"

const initState: Partial<Todo> = {
	userId: 1,
	title: ''
}

export const AddTodo = () => {
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()
	const [isFetching, setIsFetching] = useState(false)
	const [data, setData] = useState(initState)

	const isMutating = isFetching || isPending

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

		const name = e.target.name

		setData(prevData => ({
				...prevData,
				[name]: e.target.value
		}))
	}

	const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsFetching(true)

		const res = await fetch(`http://localhost:3500/todos`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
					userId: data.userId, 
					title: data.title
			})
		})

		await res.json()

		setIsFetching(false)

		setData(prev => ({
			...prev,
			title: ''
		}))

		startTransition(() => {
			if(pathname === '/add')
				router.push('/')
			else
				router.refresh()
		})
	}

	const contents = (
		<form 
			className="flex gap-2 items-center"
			style={{opacity: !isMutating ? 1 : 0.7}}
			onSubmit={handleSubmit}
		>
			<input 
				type="text"
				id='title'
				name='title'
				value={data.title}
				onChange={handleChange} 
				className="text-2xl text-black p-1 rounded-lg flex-grow w-full"
      	placeholder="New Todo"
        autoFocus
			/>

			<button 
				type="submit" 
				className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400"
			>
				Submit
			</button>
		</form>
	)

	return contents
}