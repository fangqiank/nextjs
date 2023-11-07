import mongoose from "mongoose";

let isConneted

export const connectDB = async () => {
	mongoose.set('strictQuery', true)

	if(isConneted){
		console.log('MongoDB is already connected')
		return
	}

	try{
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share_prompt',
			useNewUrlParser: true,
      useUnifiedTopology: true,
		})

		isConneted = true
		console.log('MongoDB connected')
	}catch(err){
		console.log(err)
	}
}