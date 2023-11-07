'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import {RootState, AppDispatch} from '@/store'
import { setSearch } from "@/store/searchSlice"
import { PokemonTable } from "./PokemonTable"
import { Pokemon } from "@/app/types"
import { pokemonApi } from "@/store/pokemonApi"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const SearchInput = () => {
	const dispatch = useAppDispatch()
	const search = useAppSelector(state => {
		//console.log(state.search)
		return state.search.search
	})
	const startupPokemon = useAppSelector(state => state.search.startupPokemon)
	const data = useAppSelector(state => 
		state.pokemonApi.queries[`search("${search}")`]?.data as Pokemon[]
	)

	useEffect(() => {
		dispatch(pokemonApi.endpoints.search.initiate(search))
	}, [dispatch, search])

	return (
		<div>
			<input 
				type="text"
				value={search}
				onChange={e => dispatch(setSearch(e.target.value))} 
			/>
			<PokemonTable pokemons={search.length ? data ?? [] : startupPokemon} />
		</div>
	)
}


