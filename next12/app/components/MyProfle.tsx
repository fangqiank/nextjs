import Image from "next/image"
import { lazy } from "react"

export const MyProfle = () => {
	return (
		<section className="w-full mx-auto">
			<Image
				className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
				src='/images/profile-photo.png'
				width={100}
				height={100}
				alt="zhangsan"
				priority={true} 
			/>
		</section>
	)
}