import { NextResponse } from "next/server"
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'

export const GET = async () => {
	const {getUser, isAuthenticated} = getKindeServerSession()

	if(!isAuthenticated())
		return new Response('Unauthorized', {
			status: 401
		})

		const user = getUser()
		const data = {
			message: 'Hello user',
			id: user.id
		}

		return NextResponse.json({
			data
		})
}