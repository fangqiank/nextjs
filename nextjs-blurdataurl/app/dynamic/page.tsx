import Image from "next/image"
import {getBase64} from '@/lib/getLocalBase64'

const DynamicPage = async () => {
	const myBlurDataUrl = await getBase64('http://localhost:3000/coffee.jpg')

	return (
		<main className="min-h-screen grid place-content-center">
			<div className="w-[400px] rounded-xl overflow-hidden">
				<Image
					src='/coffee.jpg'
					alt="coffee pic"
					width={4016}
					height={6016}
					sizes='400px'
					placeholder="blur"
					blurDataURL={myBlurDataUrl}
					priority
				/>
			</div>
		</main>
		
	)
}

export default DynamicPage