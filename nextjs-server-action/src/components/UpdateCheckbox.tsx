'use client'

import {experimental_useOptimistic as useOptimistic} from 'react'
import { useRouter } from 'next/navigation'
import {experimental_useFormStatus as useFormStatus} from 'react-dom'
import { updateTodo } from '@/lib/actions'
import {useTransition} from 'react'

export const UpdateCheckbox = ({todo}: {todo: Todo}) => {
	const router = useRouter()
	// const [isPending, startTransition] = useTransition()
	const {pending} = useFormStatus()
	const [optimisticTodo, addoptimisticTodo] = useOptimistic(
		todo,
		(
			state: Todo,
			completed: boolean
		) => ({...state, completed})
	)

	return (
		<input
			type='checkbox'
			className='min-w-[2rem] min-h-[2rem]'
			checked={optimisticTodo.completed}
			id="completed"
			name="completed"
			onChange={async () => {
				addoptimisticTodo(!todo.completed)
				await updateTodo(todo)
				router.refresh() //update client-side cache
			}}
			// onChange={() => startTransition(() => updateTodo(todo))}
			disabled={pending}
			// disabled={isPending}
		/>
	)
}