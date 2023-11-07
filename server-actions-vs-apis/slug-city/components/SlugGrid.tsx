'use client'

import {useState} from "react"
import Image from "next/image"
import clsx from "clsx";
import { SLUGS } from "@/data";

type SlugGridProps = {
	bookmarkSlugs: string[],
};

export const SlugGrid = ({bookmarkSlugs: initialBookmarkedSlugs,}: SlugGridProps) => {
	const [updatedBookmarks, setUpdatedBookmarks] = useState<string[]>()

	const bookmarkSlugs = updatedBookmarks || initialBookmarkedSlugs

	const toggleBookmark = async (slug: string) => {
		const req = await fetch(`/client-to-local-api/api/${slug}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				
			})
		})

		const res = await req.json()

		setUpdatedBookmarks(res.map((row: {slug: string}) => row.slug ))
	}

	return (
		<div className="flex flex-wrap">
				{SLUGS.map(({slug, name}) => (
					<div
						key={slug} 
						className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-4"
					>
						<Image
							className="w-full rounded-lg"
							src={`${slug}.png`} 
							alt={name}
            	width={1024}
            	height={1024}
						/>

						<div>
							<div className="font-bold text-xl my-2">{name}</div>

							<button
								className={clsx('text-white font-bold py-2 px-4 rounded', {
									'bg-blue-500 hover:bg-blue-700': !bookmarkSlugs.includes(slug),
									"bg-red-500 hover:bg-red-700 ": bookmarkSlugs.includes(slug),
								})}
								onClick={() => toggleBookmark(slug)}
							>
								{bookmarkSlugs.includes(slug) ?  "Un-Bookmark" : "Bookmark"}
							</button>
						</div>
					</div>
				))}
		</div>
	)
};
