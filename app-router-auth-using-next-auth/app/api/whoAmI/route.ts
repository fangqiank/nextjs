import {getServerSession} from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export const GET = async () => {
	const session = await getServerSession(authOptions)

	return NextResponse.json({
		name: session?.user?.name ?? 'not logged in'
	})
}