'use server'

import {revalidatePath} from 'next/cache'
import { uuid } from 'uuidv4'

export const addTodo = async (data: FormData) => {
	const title = data.get('title')

	await fetch('http://127.0.0.1:3500/todos', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			userId: 1,
			title,
			completed: false
		})
	})

	revalidatePath('/')
}

export const deleteTodo = async(todo: Todo) => {
	const res = await fetch(`http://127.0.0.1:3500/todos/${todo.id}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			id: todo.id
		})
	})

	await res.json()

	revalidatePath('/')
}

export const updateTodo = async (todo: Todo) => {
	const res = await fetch(`http://127.0.0.1:3500/todos/${todo.id}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			...todo,
			completed: !todo.completed
		})
	})

	await res.json()

	revalidatePath('/')
} 