import { FaTrash } from "react-icons/fa"
import Link from "next/link"
import {UpdateCheckbox} from '@/components/UpdateCheckbox'
import { deleteTodo } from "@/lib/actions"

export const Todo = (todo: Todo) => {
	return (
		<form className="my-4 flex items-center justify-between">
			<label 
				htmlFor="completed" 
				className="text-2xl hover:underline"
			>
				<Link href={`/edit/${todo.id}`}>
					{todo.title}
				</Link>
			</label>

			<div className="flex items-center gap-4">
				<UpdateCheckbox todo={todo} />

				<button
					className="p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300"
					formAction={async () => {
						'use server'
						await deleteTodo(todo)
					}}
				>
					<FaTrash />
				</button>
			</div>
		</form>
	)
}