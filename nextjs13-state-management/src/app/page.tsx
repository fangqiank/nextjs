// import { SSRPokemonTable } from "@/components/SSRPokemonTable"

import { SearchInput } from "@/components/SearchInput"
import { Counter } from "@/components/Counter"
import { UserList } from "@/components/UserList"
import { store} from "@/store"
import { setStartupPokemon } from "@/store/searchSlice"

import { AppProvider } from "@/components/AppProvider"
import { Preloader } from "@/components/Preloader"

export default async function Home() {
  const req = await fetch('http://localhost:3000/api/search')
  const data = await req.json()
  store.dispatch(setStartupPokemon(data))

  return (
    <main>   
      <AppProvider>
        <Preloader pokemons={data}/>

        <SearchInput />
        <Counter />
        <UserList />  
      </AppProvider>
      {/* <SSRPokemonTable  />       */}
    </main>
  )
}
