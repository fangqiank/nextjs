import {Todo} from '../../../components/Todo'
import {fetchTodo} from '@/lib/fetchTodo'
import { notFound } from 'next/navigation' 

export const revalidate = 0

type Props = {
	params:{
		id: string
	}
}

const page = async ({params: {id}}: Props) => {
	const todo = await fetchTodo(id)
	
	if(!todo) notFound()

	return (
		<Todo {...todo} />
	)
}

export default page