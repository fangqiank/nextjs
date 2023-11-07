'use client'

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchManufacture } from "./SearchManufacture"

const SearchBtn = ({otherClasses}: {otherClasses: string}) => {
	return (
		<button
			type="submit"
			className={`-ml-3 z-10 ${otherClasses}`}
		>
			<Image
				src='/magnifying-glass.svg'
				alt='mangnify-glasses'
				width={40}
				height={40}
				className="object-contain"
			/>
		</button>
	)
}

export const SearchBar = () => {
	const [manufacturer, setManuFacturer] = useState('')
	const [model, setModel] = useState('')

	const router = useRouter()

	const updateSearchInput = (model:string, manufacturer:string) => {
		const searchParams = new URLSearchParams(window.location.search)
	
		if(model)
			searchParams.set('model', model)
		else{
			searchParams.delete('model')
		}
	
		if(manufacturer)
			searchParams.set('manufacturer', manufacturer)
		else{
			searchParams.delete('manufacturer')
		}
	
		const newPath = `${window.location.pathname}?${searchParams.toString()}`
	
		router.push(newPath)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(manufacturer.trim() === '' && model.trim() === '')
			return alert('Please provide some input')

		updateSearchInput(model.toLowerCase(), manufacturer.toLowerCase())
	}

	const contents = (
		<form
			className="searchbar"
			onSubmit={handleSubmit}
		>
			<div className="searchbar__item">
				<SearchManufacture
					 manufacturer={manufacturer}
					 setManuFacturer={setManuFacturer}
				/>

				<SearchBtn otherClasses='sm:hidden' />
			</div>

			<div className="searchbar__item">
				<Image
					src='/model-icon.png'
					width={25}
					height={25}
					className="absolute w-[20px] h-[20px] ml-4"
					alt="model"
				/>

				<input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />

				<SearchBtn  otherClasses="sm:hidden"/>
			</div>

			<SearchBtn otherClasses="max-sm:hidden"/>
		</form>
	)

	return contents
}