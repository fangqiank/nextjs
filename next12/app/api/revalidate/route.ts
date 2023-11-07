// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=66cbf90c3e10a86ee50dba29e0020177

import {NextRequest, NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'

export const GET = async (req: NextRequest) => {
	const secret = req.nextUrl.searchParams.get('secret')
	if(secret != process.env.MY_SECRET_TOKEN)
		return new NextResponse(
			JSON.stringify({message: 'Invalid Token'}), 
			{
				status: 401,
				statusText: 'Unauthorized',
				headers:{
					'Content-Type': 'application/json'
				}
			},
		)

		const path = req.nextUrl.searchParams.get('path') || '/'

		revalidatePath(path)

		return NextResponse.json({revalidated: true})
}  
