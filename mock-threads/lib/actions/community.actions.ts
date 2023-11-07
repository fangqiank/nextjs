'use server'

import {FilterQuery, SortOrder} from 'mongoose'
import chalk from 'chalk'
import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'

import {connectDB} from '../mongoose'

export const createCommunity = async (
	id: string,
	name: string,
	username: string,
	image: string,
	bio: string,
	createdById: string
	) => {
		try{
			connectDB()

			const user = await User.findOne({id: createdById})

			if(!user)
				throw new Error(chalk.red('User not found'))

			const newCommunity = new Community({
				id,
				name, 
				username,
				image,
				bio,
				createdBy: user._id
			})

			const result = await newCommunity.save()

			user.communities.push(result._id)
			await user.save()

			return result
		}catch(err){
			console.error(chalk.red("Error creating community:", err))
			throw err
		}
	}

	export const fetchCommunityDetails = async (id: string) => {
		try{
			connectDB()

			const communityDetails = await Community.findOne({id}).populate([
				'createdBy', 
				{
					path: 'members',
					model: User,
					select: 'name username image _id id'
				}
			])

			return communityDetails
		}catch(err){
			console.error(chalk.red("Error fetching community details:", err))
			throw err
		}
	}

	export const fetchCommunityPosts = async (id: string) => {
		try{
			connectDB()

			const communityPosts = await Community.findById(id).populate({
				path: 'threads',
				model: Thread,
				populate: [
					{
						path: 'author',
						model: User,
						select: 'name image id',
					},
					
					{
						path: 'children',
						model: Thread,
						populate: {
							path: 'author',
							model: User,
							select: 'image _id'
						}
					}
				],
			})

			return communityPosts
		}catch(err){
			console.error("Error fetching community posts:", err)
    	throw err
		}
	} 

	export const fetchCommunities = async ({
		searchStr = '',
		pageNum = 1,
		pageSize = 20,
		sortBy = 'desc'
	} : {
		searchStr?: string,
		pageNum?: number,
		pageSize?: number,
		sortBy?: SortOrder
	}) => {
		try{
			connectDB()

			const skipAmt = (pageNum - 1) * pageSize

			const regex = new RegExp(searchStr, 'i')

			const query: FilterQuery<typeof Community> = {}

			if(searchStr.trim() !== ''){
				query.$or = [
					{username: {$regex: regex}}, 
					{name: {$regex: regex}}
				]
			}

			const sortOpt = {createdAt: sortBy}

			const communitiesQuery = Community.find(query)
				.sort(sortOpt)
				.skip(skipAmt)
				.limit(pageSize)
				.populate('members')

			const totalCount = await Community.countDocuments(query)

			const communities = await communitiesQuery.exec()

			const isNext = totalCount > skipAmt + communities.length

			return {
				communities,
				isNext
			}
		}catch (err) {
			console.error(chalk.red("Error fetching communities:", err))
			throw err
		}
	}

	export const addMemberToCommunity = async (
		communityId: string,
		memberId: string
	) => {
		try{
			connectDB()

			const community = await Community.findOne({id: communityId})

			if(!community)
				throw new Error('Community not found')

			const user = await User.findOne({id: memberId})
			
			if(!user)
				throw new Error("User not found")

			if(community.members.includes(user._id))
				throw new Error('User is already a member of the community')
			
			community.members.push(user._id)
			await community.save()

			user.communities.push(community._id)
			await user.save()

			return community
		}catch(err){
			console.error("Error adding member to community:", err)
   		throw err
		}	
	}

	export const removeUserFromCommunity = async (
		communityId: string,
		memberId: string
	) => {
		try{
			connectDB()

			const community = await Community.findOne({id: communityId})

			if(!community)
				throw new Error('Community not found')

			const user = await User.findOne({id: memberId})
			
			if(!user)
				throw new Error("User not found")

			if(community.members.includes(user._id))
				throw new Error('User is already a member of the community')
			
			await community.updateOne({id: community._id}, {$pull: {members: user._id}})

			return {success: true}

			return community
		}catch(err){
			console.error("Error removing user from community:", err)
   		throw err
		}	
	}

	export const updateCommunityInfo = async (
			communityId: string,
			name: string,
			username: string,
			image: string
		) => {
		try{
			connectDB()

			const updCommunity = await Community.findOneAndUpdate({id: communityId}, {name, username, image})

			if(!updCommunity)
				throw new Error('Community not found')

			return updCommunity
		}catch(err){
			console.error("Error updating community information:", err)
    	throw err
		}
	}

	export const deleteCommunity =async (communityId: string) => {
		try{
			connectDB()

			const toBeDeletedCommunity = await Community.findOne({id: communityId})

			if(!toBeDeletedCommunity)
				throw new Error('Community not found')

			await Thread.deleteMany({community: communityId})

			const users = await User.find({communities: communityId})

			const updateUserPromises = users.map(user => {
				user.communities.pull(communityId)
				return user.save()
			})

			await Promise.all(updateUserPromises)

			return toBeDeletedCommunity
		}catch(err){
			console.error("Error deleting community: ", err)
    	throw err
		}
	}

