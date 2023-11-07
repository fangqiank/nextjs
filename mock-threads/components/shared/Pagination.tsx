'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/Button"

type PaginationProps = {
	pageNumber: number,
	isNext: boolean,
	path: string
}

export const Pagination = ({
	pageNumber,
	isNext,
	path
}: PaginationProps) => {
	const router = useRouter()

	const handleNavigation = (type: string) => {
		let nextPageNumber = pageNumber

		if(type === 'prev')
			nextPageNumber = Math.max(1, pageNumber - 1)
		else if(type === 'next')
			nextPageNumber = pageNumber + 1

		nextPageNumber > 1 ? router.push(`/${path}?page=${nextPageNumber}`) : router.push(`/${path}`)
	}
	
	if(!isNext && pageNumber === 1) 
			return null

	const contents = (
		<div className="pagination">
			<Button
				onClick={() => handleNavigation('prev')}
				disabled={pageNumber === 1}
				className="text-small-regular text-light-2" 
			>
				Prev
			</Button>

			<p className="text-light-1 text-small-semibold">{pageNumber}</p>

			<Button
				onClick={() => handleNavigation('next')}
				disabled={!isNext}
				className="text-small-regular text-light-2" 
			>
				Next
			</Button>
		</div>
	)

	return contents
}