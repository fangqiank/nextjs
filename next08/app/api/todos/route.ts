import { NextRequest, NextResponse } from "next/server"

const fetchURL = 'https://jsonplaceholder.typicode.com/todos'

const api_key = process.env.DATA_API_KEY as string

export const GET= async (request: NextRequest) => {
	const origin = request.headers.get('origin')
	
	const res = await fetch(fetchURL)

	const todos: Todo[] = await res.json()

	return new NextResponse(JSON.stringify(todos), {
		headers: {
			'access-control-allow-origin': origin || '*',
			'content-type': 'application/json'
		}
	})
} 

export const DELETE = async (req: Request) => {
	const { id }: Partial<Todo> = await req.json()

    if (!id) 
			return NextResponse.json({ "message": "Todo id required" })

    await fetch(`${fetchURL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': api_key
        }
    })

    return NextResponse.json({ "message": `Todo ${id} deleted` })
}

export const POST = async (req: Request) => {
	const {userId, title}: Partial<Todo> = await req.json()

	if(!userId || !title)
		return NextResponse.json({'msg': 'Missing required data'})

	const res = await fetch(fetchURL, {
		method: 'post', 
		headers: {
			'Content-Type': 'application/json',
      'API-Key': api_key
		},
		body:JSON.stringify({
			userId,
			title,
			completed: false
		})
	})

	const newTodo: Todo = await res.json()

	return NextResponse.json(newTodo)
}

export const PUT = async (req: Request) => {
	const {userId, id, title, completed}: Todo = await req.json()

	if(!userId || !id || !title || typeof completed !== 'boolean')
		return NextResponse.json({
			'msg': 'Missing required data'
		})

 const res = await fetch(`${fetchURL}/${id}`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
      'API-Key': api_key
		},
		body: JSON.stringify({
			userId,
			title,
			completed
		})
 }) 

 const updTodo: Todo = await res.json()

 return NextResponse.json(updTodo)
}




