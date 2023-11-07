import { NextRequest } from "next/server"
import {handleAuth} from '@kinde-oss/kinde-auth-nextjs/server'

export const GET = async (req: NextRequest , {params}: any) => {
	const endpoint = params.kindeAuth
	return handleAuth(req, endpoint)
}