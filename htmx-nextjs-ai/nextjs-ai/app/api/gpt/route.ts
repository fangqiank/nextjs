import { NextResponse } from "next/server"
import {startRequest} from '@/app/(lib)/requests'

export const POST =async (req:Request) => {
	const body = await req.json()
	const {prompt} = body
	const requestId = await startRequest(prompt)
	return NextResponse.json(requestId)
} 