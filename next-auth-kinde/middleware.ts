// Without a defined matcher, this one line applies next-auth 
// to the entire project
import {authMiddleware} from '@kinde-oss/kinde-auth-nextjs/server'
// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { 
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	] 
}

export default authMiddleware