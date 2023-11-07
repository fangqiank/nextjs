import { addTodo } from "@/lib/actions"

export const AddTodo = () => {
	return (
		<form
			className="flex gap-2 items-center"
			action={addTodo}
		>
			<input 
				type="text"
				name='title'
				className="text-2xl p-1 rounded-lg flex-grow w-full"
				placeholder="New todo"
				autoFocus 
			/>

			<button
				className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400"
				type="submit"
			>
				Submit
			</button>
		</form>
	)
}