'use client'

import {useState, useTransition, ChangeEvent, MouseEvent} from 'react'
import { useRouter } from 'next/navigation'
import {FaTrash} from 'react-icons/fa'
import Link from 'next/link'

export const Todo = (todo: Todo) => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [isFetching, setIsFetching] = useState(false)
	
	const isMutating = isFetching || isPending
	
	const handleChange = async(e: ChangeEvent<HTMLInputElement>) => {
		setIsFetching(true)

		const res = await fetch (`http://localhost:3500/todos/${todo.id}`, {
			method: 'put',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				...todo,
				completed: !todo.completed
			})
		})

		const result = await res.json()
		console.log(result)

		setIsFetching(false)

		startTransition(() => {
			router.refresh()
		})
	}

	const handleDelete = async(e: MouseEvent<HTMLButtonElement>) => {
		setIsFetching(true)

		const res = await fetch(`http://localhost:3500/todos/${todo.id}`, {
			method: 'delete',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				id: todo.id
			})
		})

		await res.json()

		setIsFetching(false)

		startTransition(() => {
			router.refresh()
		})
	}

	const contents = (
		<article 
			className="my-4 flex justify-between items-center"
			style={{opacity: !isMutating ? 1 : 0.7}}
		>
			<label className="text-2xl hover:underline">
				<Link 
					href={`/edit/${todo.id}`}
					// prefetch={false}
				>
					{todo.title}
				</Link>
			</label>

			<div className="flex items-center gap-4">
				<input 
					type="checkbox"
					checked={todo.completed}
					id='completed'
					name='completed'
					onChange={handleChange}
					disabled={isPending}
					className='min-w-[2rem] min-h-[2rem]' 
				/>

				<button 
					className="p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300"
					onClick={handleDelete}
          disabled={isPending}
				>
					<FaTrash />
				</button>
			</div>
		</article>
	)

	return contents

}