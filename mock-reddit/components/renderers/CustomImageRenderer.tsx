'use client'

import Image from "next/image"

export const CustomImageRenderer = ({data}: any) => {
	const src = data.file.url

	return (
		<div className="relative w-full min-h-[15rem]">
			<Image
				src={src}
				className="object-contain"
				alt='image'
				fill 
			/>
		</div>
	)
}