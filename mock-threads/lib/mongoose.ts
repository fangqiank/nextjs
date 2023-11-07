import mongoose from "mongoose"
import chalk from 'chalk'
// import type {ConnectOptions} from 'mongoose'

export const connectDB = async () => {
	mongoose.set('strictQuery', true)

	if (mongoose.connections[0].readyState) 
    return
	
	try{
		// const options: ConnectOptions = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
		// 	autoIndex: true,
    // }

		await mongoose.connect(process.env.MONGODB_URL!)

		console.log(chalk.bgGreen('Connected to MongoDB database'))
	}catch(err){
		console.error(chalk.bgRed('MongoDB connection error:', err))
	}
}