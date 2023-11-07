import { fetchTodos } from '@/lib/fetchTodos'
import { Todo } from './Todo'

export const TodoList = async () => {
	const todos = await fetchTodos()

	let contents

	if(!todos || todos.length === 0){
		contents = (
			<p>No todos</p>
		)
	}else {
		const sortedTodos = todos.reverse()

		contents = (
			<>
				{sortedTodos.map(todo => (
					<Todo
						key={todo.id}
						{...todo} 
					/>
				))}
			</>
		)
	}

	return contents
}