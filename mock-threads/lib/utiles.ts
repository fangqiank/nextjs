import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const isBase64Img = (data: string) => {
	const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
	return base64Regex.test(data)
}

export const formatDataStr = (inputDate: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}

	const date = new Date(inputDate)

	const formattedDate = date.toLocaleDateString(undefined, options)

	const time = date.toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit'
	})

	return `${formattedDate} ${time}`
}

export const formatThreadCount = (count: number): string => {
	if(count === 0)
		return 'no threads'

	const threadCount = count.toString().padStart(2, '0')
	const plural = count === 1 
		? 'Thread' 
		: count > 1 
			? 'Threads' 
			: 'Thread'
	
	return `${threadCount} ${plural}`
}