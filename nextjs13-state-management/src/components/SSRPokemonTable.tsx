import { PokemonTable } from "./PokemonTable"
import { store } from "@/store"

export const SSRPokemonTable = () => {
	return (
		<div>
			<PokemonTable pokemons={store.getState().search.startupPokemon} />
		</div>
	)
};
