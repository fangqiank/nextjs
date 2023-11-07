import Image from "next/image"
import coffeePic from '../../public/coffee.jpg'


const StaticPage = () => {
	return (
		<main className="min-h-screen grid place-content-center">
			<div className="w-[400px] rounded-2xl overflow-hidden">
				<Image
					src={coffeePic}
					alt="coffee pic"
					width={4016}
					height={6016}
					sizes="400px"
					placeholder="blur"
					priority 
				/>
			</div>
		</main>
	)
}

export default StaticPage