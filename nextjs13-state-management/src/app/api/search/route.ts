import { NextResponse } from "next/server"
import pokemon from '@/pokemon.json'

export async function GET(request: Request) {
	// console.log(new URL(request.url))
  const {searchParams} = new URL(request.url)

	const name = searchParams.get('name')

	const pokemonData = pokemon.filter(x => 
		x.name.toLowerCase().includes(name?.toLowerCase() ?? ''))

	return NextResponse.json(pokemonData.slice(0, 10))
}