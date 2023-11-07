import {fetchTodos} from '@/lib/fetchTodos'
import {Todo} from './Todo'

export const TodoList = async () => {
	const todos = await fetchTodos()

	const sortedTodos =  todos.reverse()
	
	const contents = (
		<>
			{sortedTodos.map(todo => (
				<Todo key={todo.id} {...todo}/>
			)) }
		</>
	)
	
	return contents
}