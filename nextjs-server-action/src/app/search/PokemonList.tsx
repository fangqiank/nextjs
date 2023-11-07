'use client'
import {useState, useEffect} from 'react'

export const PokemonList = ({search}: {search: (searchTerm: string) => Promise<string[]>}) => {
	const [pokemonNames, setPokemonNames] = useState<string[]>([])
	const [term, setTerm] = useState('')

	useEffect(() => {
		search('').then(names => setPokemonNames(names))
	}, [search])

	const onClick = async () => {
		setPokemonNames(await search(term))
	}

	const contents = (
		<div>
			<div className="flex gap-2">
				<input 
					type="text"
					value={term}
					onChange={e => setTerm(e.target.value)}
					className='border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparen' 
				/>

				<button
					onClick={onClick}
					className='className="bg-blue-600 disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
				>
					Search
				</button>
			</div>
			
			<div className="text-4xl py-5">
				Names: {pokemonNames.join(", ")}
			</div>
		</div>
	)

	return contents
}