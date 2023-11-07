import {PokemonList} from './PokemonList'

const PokemonSearch = () => {
	const search = async (searchTem: string) => {
		'use server'

		const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)

		const pokemonData = await pokemons.json()

		console.log(pokemonData);

		return pokemonData.results.filter(
			(p: any) => p.name.toLowerCase().includes(searchTem.toLowerCase())
		).map((p: any) => p.name).slice(0, 50)
	}

	return (
		<main className="p-5">
			<PokemonList  search={search} />
		</main>
	)
}

export default PokemonSearch