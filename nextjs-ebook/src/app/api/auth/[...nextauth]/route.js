import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
import User from "../../../../models/user"
import { connectDB } from "../../../../utils/database"

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_ID,
		// 	clientSecret: process.env.GOOGLE_SECRET
		// })
	],

	callbacks: {
		async session ({session}) {
			const user = await User.findOne({email: session.user.email})
			session.user.id = user._id.toString()

			return session
		},

		async signIn({profile}) {
			try{
				await connectDB()

				const userExists = await User.findOne({email: profile.email})

				//console.log(profile)

				if(!userExists){
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture || profile.avatar_url
					})
				}

				return true
			}catch(err){
				console.log('Error checking if user exists: ', err.message)
				
				return false
			}
		}
	}
})

export {
	handler as GET,
	handler as POST 
}



