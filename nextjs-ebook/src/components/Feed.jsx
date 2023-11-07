'use client'

import {useState, useEffect} from 'react'
import { PromptCard } from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map(post => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick} 
				/>
			))}
		</div>
	)
}

export const Feed = () => {
	const [posts, setPosts] = useState([])
	const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch('/api/prompt')
			const data = await res.json()
			
			setPosts(data)
		}

		fetchPosts()
	}, [])

	const handleSearchChange = e => {
		clearTimeout(searchTimeout)
		setSearchText(e.target.value)

		setSearchTimeout(
			setTimeout(() => {
				const result = filterPrompts(e.target.value)
				setSearchedResults(result)
			}, 500)
		)
	}

	const filterPrompts = searchText => {
		const regex = new RegExp(searchText, 'i')
		return posts.filter(item  => regex.test(item.creator.username) 
			|| regex.test(item.tag)
			|| regex.test(item.prompt))
	}

	const handleClick = tagName => {
		setSearchText(tagName)

		const result = filterPrompts(tagName)
		setSearchedResults(result)
	}

	const contents = (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input 
					type="text"
					placeholder='Search for a tag or username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer' 
				/>
			</form>

			{searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleClick} 
				/>
			) : (
				<PromptCardList
					data={posts}
					handleTagClick={handleClick} 
				/>
			)}
		</section>
	)

	return contents
}
