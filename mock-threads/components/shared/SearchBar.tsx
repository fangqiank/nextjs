'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "../ui/Input"

export const SearchBar = ({routeType}: {routeType: string}) => {
	const router = useRouter()
	
	const [search, setSearch] = useState('')

	useEffect(() => {
		const delay = setTimeout(() => {
			search ? router.push(`/${routeType}?q=${search}`) : router.push(`/${routeType}`)
		}, 300)

		return () => clearTimeout(delay)
	}, [search, routeType])

	return (
		<div className="searchbar">
			<Image
				src='/assets/search-gray.svg'
				alt='search'
				width={20}
				height={20}
				className="object-contain" 
			/>

			<Input
				id='text'
				className="no-focus searchbar_input"
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder={`${routeType !== '/search' ? 'search communities': 'search creators'}`} 
			/>
		</div>
	)
}