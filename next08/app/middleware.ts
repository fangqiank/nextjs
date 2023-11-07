import {NextResponse ,NextRequest } from "next/server"

const allowedOrigins = process.env.NODE_ENV === 'production'
	? ['htps://www.yoursite.com', 'htps://yoursite.com']
	: ['http://localhost:3000', 'https://www.google.com']

export const middleware = (request: NextRequest) => {
	// const  regex = new RegExp('/api/*')

	// if(regex.test(request.url)){

	// }
	const origin = request.headers.get('origin')
	console.log(origin)

	if(origin && !allowedOrigins.includes(origin)){
		return new NextResponse(null, {
			status: 400,
			statusText: 'Nad Request',
			headers: {
				'content-type': 'text/plain'
			}
		})
	}

	console.log('Middleare!')

	console.log(request.method)
	console.log(request.url)

	return NextResponse.next()
}

export const config = {
	matcher: '/api/:path*'
}