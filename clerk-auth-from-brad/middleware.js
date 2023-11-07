import {authMiddleware} from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: ['/', '/profile', '/register', '/token']
})

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}