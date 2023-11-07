import { Pokemon } from '@/app/types'

export const PokemonTable = ({pokemons}: {pokemons: Pokemon[]}) => {
	const content = (
		<table>
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>

			<tbody>
				{pokemons.map(p => (
					<tr key={p.name}>
						<td>{p.name}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
	
	return content
};
