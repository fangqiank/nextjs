import { NextResponse, NextRequest} from "next/server"

const fetchURL = 'https://jsonplaceholder.typicode.com/todos'
const api_key = process.env.DATA_API_KEY as string

// export const GET = async (req: Request) => {
// 	const id = req.url.slice(req.url.lastIndexOf('/') + 1)
	
// 	const res = await fetch(`${fetchURL}/${id}`, {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'API-Key': api_key
// 		}
// 	})

// 	const todo: Todo = await res.json()

// 	if (!todo.id) 
// 		return NextResponse.json({ "msg": "Todo not found" })

// 	return NextResponse.json(todo)
// }

type Props = {
	params: {
		id: number
	}
};

export const GET = async (
		req: NextRequest, 
		{params}: {params: Props}
	) => {
	// const {searchParams} = new URL(req.url)
	// const id = searchParams.get('id')
	const {id} = params

	const res = await fetch(`${fetchURL}/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			'API-Key': api_key
		}
	})

	const todo: Todo = await res.json()

	return NextResponse.json(todo)
}
