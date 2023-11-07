import Prompt from '../../../../models/prompt'
import {connectDB} from '../../../../utils/database'

export const GET = async (req, {params}) => {
	try{
		await connectDB()

		const prompt = await Prompt.findById(params.id).populate('creator')
		if(!prompt)
			return new Response('Prompt not found', {
				status: 404
			})
		
		return new Response(JSON.stringify(prompt), {
			status: 200
		})
	}catch(err){
		return new Response('Internal Server Error', {
			status: 500
		})
	}
}

export const PATCH = async(req, {params}) => {
	const {prompt, tag} = await req.json()

	try{
		await connectDB()

		const existedPrompt = await Prompt.findById(params.id)

		if(!existedPrompt)
			return new Response('Prompt not found', {
				status: 404
			})
		
		existedPrompt.prompt = prompt
		existedPrompt.tag = tag

		await existedPrompt.save()

		return new Response('Successfully updated the Prompts', {
			status: 200
		})
	}catch(err){
		return new Response("Error Updating Prompt", { 
			status: 500 
		})
	}
}

export const DELETE = async(req, {params}) => {
	try{
		await connectDB()

		const existedPrompt = await Prompt.findByIdAndDelete(params.id)

		return new Response("Prompt deleted successfully", { 
			status: 200 
		})
	}catch(err){
		return new Response("Error deleting prompt", { 
			status: 500 
		})
	}
}