import Prompt from "../../../../../models/prompt"
import { connectDB } from '../../../../../utils/database'

export const GET = async(req, {params}) => {
	try{
		await connectDB()

		const prompts = await Prompt.find({creator: params.id}).populate('creator')

		return new Response(JSON.stringify(prompts), {status: 200})
	}catch(err){
		return new Response("Failed to fetch prompts created by user", { status: 500 })
	}
}