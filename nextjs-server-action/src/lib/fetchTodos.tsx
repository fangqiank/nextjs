export const fetchTodos = async () => {
	try{
		const res = await fetch('http://127.0.0.1:3500/todos')

		if(res.ok){
			const todos: Todo[] = await res.json()

			return todos
		}

		return undefined
		
	}catch(err){
		console.log(err instanceof Error && err.stack)
	}
}