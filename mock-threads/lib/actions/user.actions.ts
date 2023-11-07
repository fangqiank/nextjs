'use server'

import {FilterQuery, SortOrder} from 'mongoose'
import {revalidatePath} from 'next/cache'
import {connectDB} from '../mongoose'
import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'

export const fetchUser = async (userId: string) => {
	try{
		connectDB()

		return await User.findOne({id: userId}).populate({
			path: 'communities',
			model: Community
		})
	}catch(err: any){
		throw new Error(`Failed to fetch user: ${err.message}`)
	}
}

export const updateUser = async ({
	userId,
	username,
	name,
	bio,
	image,
	path
}: {
	userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
}): Promise<void> => {
	try{
		connectDB()

		await User.findOneAndUpdate(
			{
				id: userId
			}, {
				username: username.toLowerCase(),
				name, 
				bio, 
				image,
				onboarded: true
			}, {
				upsert: true
			}
		)

		if(path === '/profile/edit')
			revalidatePath(path)
	}catch(err: any){
		throw new Error(`Failed to create/update user: ${err.message}`)
	}
}

export const fetchPostsByUser =async (userId: string) => {
	try{
		connectDB()

		const threads = await User
			.findOne({id: userId})
			.populate({
				path: 'threads',
				model: Thread,
				populate: [
					{
						path: 'community',
						model: Community,
						select: 'name _id id image'
					},
					{
						path: 'children',
						model: Thread,
						populate: {
							path: 'author',
							model: User,
							select: 'name image id'
						}
					}
				]
		})

		return threads
	}catch(err){
		console.error("Error fetching user threads:", err)
    throw err
	}
}

export const fetchUsers = async ({
	userId,
	searchString = '',
	pageNumber = 1,
	pageSize = 20,
	sortBy = 'desc'
}: {
	userId: string,
	searchString?: string,
	pageNumber?: number,
	pageSize?: number,
	sortBy?: SortOrder
}) => {
	try{
		connectDB()

		const skipAmt = (pageNumber - 1) * pageSize

		const regex = new RegExp(searchString, 'i')

		const query: FilterQuery<typeof User> = {
			id: {
				$ne: userId
			}
		}

		if(searchString.trim() !== ''){
			query.$or = [
				{
					username: {
						$regex: regex
					}
				}, 
				{
					name: {
						$regex: regex
					}
				}
			]
		}

		const sortOptions = {
			createdAt: sortBy
		}

		const userQuery = User.find(query)
			.sort(sortOptions)
			.skip(skipAmt)
			.limit(pageSize)

		const userCount = await User.countDocuments(query)

		const users = await userQuery.exec()

		const isNext = userCount > skipAmt + users.length

		return {users, isNext}
	}catch(err){
		console.error("Error fetching users:", err)
    throw err
	}
}

export const getReplies = async (userId: string) => {
	try{
		connectDB()

		const userThreads = await Thread.find({author: userId})

		const childThreadIds = userThreads.reduce((acc, cur) => {
			return  acc.concat(cur.children)
		}, [])

		const replies = await Thread.find({
			_id: {
				$in: childThreadIds
			},
			author: {
				$ne: userId
			}
		}).populate({
			path: 'author',
			model: User,
			select: 'name image _id'
		})

		return replies
	}catch(err){
		console.error("Error fetching replies: ", err);
    throw err
	}
}