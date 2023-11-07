import type { Metadata } from "next"
import { cookies } from "next/headers"
import {getSelectedSlugs} from '@/remote-api'
import { SlugGrid } from "@/components/SlugGrid"

const Home = async () => {
	const bookmarkSlugs = await getSelectedSlugs(cookies().get('__session')?.value!)

	return (
		<>
      <h1 className="text-3xl font-bold mb-3">
        Client Components - Microservice Proxy Through Local API
      </h1>

      <SlugGrid bookmarkSlugs={bookmarkSlugs.map((row) => row.slug)} />
    </>
	)
}

export default Home

export const metadata: Metadata = {
  title: "Client Components - Microservice Proxy Through Local API",
}