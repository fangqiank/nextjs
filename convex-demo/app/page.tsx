import { ConvexHttpClient } from 'convex/browser'
import { api } from '@/convex/_generated/api'
import { ProductCard } from './(components)/ProductCard'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "")

export const dynamic = "force-dynamic"

export default async function Home() {
  const outfits = await convex.query(api.outfits.get)
  
  const contents = (
    <>
      {outfits?.map(outfit => (
        <div key={outfit._id}>
          <div className="flex flex-row items-center ml-2 mr-5">
            <h1 className="mt-5">
              <span className="text-4xl font-bold">{outfit?.title}</span>{' '}
            </h1>

            <div className="flex-grow" />

            <div className="text-3xl">
              $
              {outfit?.products.reduce((acc, cur) => acc + (cur?.price ?? 0), 0)}
            </div>
          </div>

          <ul
            role='list' 
            className="flex flex-row overflow-x-scroll gap-2 m-2"
          >
            {outfit.products.map(prod => (
              <li key={prod._id}>
                <ProductCard
                  {...prod} 
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
  
  return contents
}
