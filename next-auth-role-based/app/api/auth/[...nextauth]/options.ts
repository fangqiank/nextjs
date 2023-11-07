import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import {GithubProfile} from 'next-auth/providers/github'

export const options: NextAuthOptions = {
	providers: [
		GitHubProvider({
			profile(profile: GithubProfile){
				return {
					...profile,
					role: profile.role ?? 'user',
					id: profile.id.toString(),
					image: profile.avatar_url
				}
			},
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}),

		CredentialsProvider({
			name: 'Credentials',
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
					password: 'password',
					role: 'manager'
				}

				return (config?.username === user.name && config?.password === user.password) 
					? user 
					: null
			},
		})
	],

	callbacks: {
		// Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
		async jwt({token, user}) {
			if(user)
				token.role = user.role
			
				return token
		},

		async session({session, token}){
			if(session?.user)
				session.user.role = token.role
				return session
		}
	}

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