'use client'

import { useRouter } from "next/navigation"
import { CustomButton } from "./CustomButton"
import { ShowMoreProps } from "../../../types"
import { updateSearchParam } from "../../../utils"

export const ShowMore = ({pageNumber, isNext}: ShowMoreProps) => {
	const router = useRouter()

	const handleClick = () => {
		const newLimit = (pageNumber + 1) * 10
		const newPath = updateSearchParam('limit', `${newLimit}`)

		router.push(newPath) 
	}

	const contents = (
		<div className="w-full flex-center gap-5 mt-10">
			{!isNext && (
				<CustomButton
					btnType="button"
					title='Show More'
					containerStyles="bg-primary-blue rounded-full text-white"
					handleClick={handleClick} 
				/>
			)}
		</div>
	)

	return contents
}