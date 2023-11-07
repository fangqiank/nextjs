'use server'

import {revalidatePath} from 'next/cache'
import {connectDB} from '../mongoose'
import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'

export const fetchPosts =async (
	pageNumber = 1,
	pageSize = 20
) => {
	try{
		connectDB()

		const skipAmt = (pageNumber - 1) * pageSize

		const postQuery = Thread.find({
			parentId: {
				$in: [null, undefined]
			}
		})
		.sort({
			createdAt: 'desc'
		})
		.skip(skipAmt)
		.limit(pageSize)
		.populate({
			path: 'author',
			model: User
		})
		.populate({
			path: 'community',
			model: Community
		})
		.populate({
			path: 'children',
			populate: {
				path: 'author',
				model: User,
				select: '_id name parentId image'
			}
		})

		const postsCount = await Thread.countDocuments({
			parentId: {
				$in: [null, undefined] 
			}
		})

		const posts = await postQuery.exec()

		const isNext = postsCount > skipAmt + posts.length

		return {posts, isNext}
	}catch(err){
		console.error('Problems with fetching posts...', err)
		throw err
	}
}

export const createThread = async ({
	text,
	author,
	communityId,
	path
}: {
	text: string,
	author: string,
	communityId: string | null,
	path: string
}) => {
	try {
		connectDB()

		const communityObj = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    )

		const newThread = await Thread.create({
			text,
			author,
			community: communityObj
		})

		await User.findByIdAndUpdate(author, {
			$push: {
				threads: newThread._id
			}
		})

		if(communityObj){
			await Community.findByIdAndUpdate(communityObj, {
				$push: {
					threads: newThread._id
				}
			})
		}
		
		revalidatePath(path)
	}catch(err: any){
		throw new Error(`Failed to create thread: ${err.message}`)
	}
}

export const fetchAllChildrenThreads = async (threadId: string): Promise<any[]> => {
	const childThreads = await Thread.find({parentId: threadId})

	const descThreads = []

	for (const child of childThreads) {
    const descendants = await fetchAllChildrenThreads(child._id)
    descThreads.push(child, ...descendants)
  }

	return descThreads
} 

export const deleteThread =async (threadId: string, path: string) => {
	try{
		connectDB()

		const main = await Thread
			.findById(threadId)
			.populate('author community')

		if(!main)
			throw new Error('Thread not found')

		const descThreads = await fetchAllChildrenThreads(threadId)
		
		const descThreadIds = [
			threadId,
			...descThreads.map(t => t._id)
		]

		const uniqueAuthorIds = new Set(
			[
				...descThreads.map(t => t.author?._id?.toString()),
				main.author?._id?.toString(),
			].filter(id => id !== undefined)
		)

		const uniqueCommunityIds = new Set(
			[
				...descThreads.map(t => t.community?._id?.toString()),
				main.community?._id?.toString()
			].filter(id => id !== undefined)
		)

		
		await Thread.deleteMany({
			_id: {
				$in: descThreadIds
			}
		})

		await User.updateMany(
			{
				_id: {
					$in: Array.from(uniqueAuthorIds)
				}
			},
			{
				$pull: {
					threads: {
						$in: descThreadIds
					}
				}
			}
		)

		await Community.updateMany({
			_id: {
				$in: Array.from(uniqueCommunityIds)
			}
		}, {
			$pull: {
				threads: {
					$in: descThreadIds
				}
			}
		})

		revalidatePath(path)
	}catch(err: any){
		throw new Error(`Failed to delete thread: ${err.message}`)
	}
}

export const fetchThreadById = async (threadId: string) => {
	try{
		connectDB()

		const thread = await Thread
			.findById(threadId)
			.populate({
				path: 'author',
				model: User,
				select: '_id id name image'
			})
			.populate({
				path: 'community',
				model: Community,
				select: '_id id name image'
			})
			.populate({
				path: 'children',
				populate: [
					{
						path: 'author',
						model: User,
						select: '_id id name parentId image' 
					},
					{
						path:'children',
						model: Thread,
						populate: {
							path: 'author',
							model: User,
							select: '_id id name parentId image'
						}
					}
				]
			})
			.exec()

			return thread
	}catch(err){
		console.error("Error while fetching thread:", err)
    throw new Error("Unable to fetch thread")
	}
}

export const addCommentToThread =async (
	threadId: string,
	comment: string,
	userId: string,
	path: string
) => {
	try{
		connectDB()

		const originalThread = await Thread.findById(threadId)
		
		if(!originalThread)
			throw new Error('Thread not found')

		const newThread = new Thread({
			text: comment,
			author: userId,
			parentId: threadId
		})
		
		const result = await newThread.save()

		originalThread.children.push(result._id)
		await originalThread.save()

		revalidatePath(path)
	}catch(err){
		console.error("Error while adding comment:", err)
    throw new Error("Unable to add comment")
	}
}
