import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}),

		CredentialsProvider({
			name: 'Credentuals',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'your username'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'your password'
				}
			},
			
			async authorize(config){
				const user = {
					id: '0fc4b477-1816-4743-9a7c-ed546123c6a0',
					name: 'zhangsan',
					password: 'password'
				}

				return (config?.username === user.name && config?.password === user.password) 
					? user 
					: null
			},
		})
	]
}

// postman: http://localhost:3000/api/auth/providers
/*
{
	"github": {
			"id": "github",
			"name": "GitHub",
			"type": "oauth",
			"signinUrl": "http://localhost:3000/api/auth/signin/github",
			"callbackUrl": "http://localhost:3000/api/auth/callback/github"
	},
	"credentials": {
			"id": "credentials",
			"name": "Credentuals",
			"type": "credentials",
			"signinUrl": "http://localhost:3000/api/auth/signin/credentials",
			"callbackUrl": "http://localhost:3000/api/auth/callback/credentials"
	}
}
*/