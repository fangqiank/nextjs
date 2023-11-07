import {withAuth, NextRequestWithAuth} from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	function middleware(req: NextRequestWithAuth){
		if(req.nextUrl.pathname.startsWith('/extra') 
			&& req.nextauth.token?.role !== 'admin'){
				return NextResponse.rewrite(
					new URL('/denied', req.url)
				)
		}

		if(req.nextUrl.pathname.startsWith('/client') 
			&& req.nextauth.token?.rele !== 'admin'
			&& req.nextauth.token?.role !== 'manager'){
				return NextResponse.rewrite(
					new URL('/denied', req.url)
				)
		}
	}, {
		callbacks: {
			// authorized: ({token}) => token?.role === 'admin'
			authorized: ({ token }) => !!token
		}
	}
)

export const config = {
	matcher: [
		'/extra',
		'/client',
	]
}