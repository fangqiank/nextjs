'use client'

import { useRef } from "react"
import { store } from "@/store"
// import { useAppSelector } from "./SearchInput" 
import { setStartupPokemon } from "@/store/searchSlice"
import { Pokemon } from "@/app/types"

export const Preloader = ({pokemons}: {pokemons: Pokemon[]}) => {
	const loader = useRef(false)
	// const count = useAppSelector(state => state.counter.value)
	// const startupPokemon = useAppSelector(state => state.search.startupPokemon)

	if(!loader.current) {
		store.dispatch(setStartupPokemon(pokemons))
		loader.current = true
	}

	return null
};
