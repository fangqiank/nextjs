export const fetchTodo = async (id: string) => {
	const res = await fetch(`http://localhost:3500/todos/${id}`,{
		cache:'no-store'
	})

	if(!res.ok)
		return undefined
	
	const todo: Todo = await res.json()

	return todo
}