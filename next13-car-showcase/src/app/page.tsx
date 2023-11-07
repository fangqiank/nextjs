import { fetchCars } from "../../utils"
import { fuels, yearsOfProduction } from "../../constants"
import { HomeProps } from "../../types"
import { Hero } from "./components/Hero"
import {CustomFilter} from "./components/CustomFilter"
import { CarCard } from "./components/CarCard"
import { SearchBar } from "./components/SearchBar"
import { ShowMore } from "./components/ShowMore"

export default async function Home({searchParams}: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || ''
  })

  console.log(allCars);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  const contents = (
    <main className="overflow-hidden">
      <Hero />

      <div 
        className="mt-12 padding-x padding-y max-width"
        id='discover'
      >
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, cupiditate.</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter
              title='fuel'
              options={fuels} 
            />

            <CustomFilter
              title='year'
              options={yearsOfProduction} 
            />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, idx) => (
              <CarCard 
                key={idx}
                car={car}
              />))}
            </div>

            <ShowMore 
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )

  return contents
}
