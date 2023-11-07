import {getPlaiceholder, } from 'plaiceholder'

export const getBase64 = async (imageUrl: string) => {
	try{
		const res = await fetch(imageUrl)

		if(!res.ok)
			throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)

		const buffer = await res.arrayBuffer()

		const {base64} = await getPlaiceholder(Buffer.from(buffer))

		return base64
	}catch(err){
		if(err instanceof Error)
			console.error(err.stack)
	}
}

export const addBlurredDataUrls = async (images: ImagesResults): Promise<Photo[]> => {
	const base64Promises = images.photos.map(p => getBase64(p.src.large))

	const base64Results = await Promise.all(base64Promises)

	const photosWithBlur: Photo[] = images.photos.map((p, i) => {
		p.blurDataUrl = base64Results[i]
		return p
	})

	return photosWithBlur
}