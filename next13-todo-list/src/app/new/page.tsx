import { prisma } from "@/db"
import Link from "next/link"
import {redirect} from 'next/navigation'

async function createTodo(data: FormData) {
	'use server'

	const title = data.get('title')?.valueOf()
	if(typeof title !== 'string' || title.length === 0)
		throw new Error('Invalid title')

	await prisma.todo.create({data: {
			title,
			completed: false
		}
	})

	redirect('/')
}

const NewPage = () => {
	return (
		<>
			<header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>

			<form 
				className="flex gap-2  flex-col"
				action={createTodo}
			>
				<input 
					type="text"
					name='title' 
					className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
				/>

				<div className="flex gap-1 justify-end">
					<Link
						className="border border-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
						href='..'
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="border border-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
					>
						Create
					</button>
				</div>
			</form>
		</>
	)
}

export default NewPage