import {Todo} from '../../../components/Todo'
import { fetchTodo } from '@/lib/fetchTodo'
import {notFound} from 'next/navigation'

type SingleTodoPageProps = {
	params: {
		id: string
	}
}

const SingleTodoPage = async ({params: {id}}: SingleTodoPageProps) => {
	const todo = await fetchTodo(id)

	if(!todo) notFound()

	return (
		<Todo {...todo} />
	)
}

export default SingleTodoPage