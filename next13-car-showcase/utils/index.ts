import { CarProps, FilterProps } from "../types"

export const caculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50
	const mileageFactor = 0.1
	const ageFactor = 0.05

	const mileageRate = city_mpg * mileageFactor
	const ageRate = (new Date().getFullYear() - year) * ageFactor

	const rentRatePerDay = basePricePerDay + mileageRate + ageRate

	return rentRatePerDay.toFixed(0)
}

export const updateSearchParam = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search)
	searchParams.set(type, value)

	const newPath = `${window.location.pathname}?${searchParams.toString()}`

	return newPath
}

export const deletSearchParams = (type: string) => {
	const newParams = new URLSearchParams(window.location.search)
	newParams.delete(type.toLocaleLowerCase())

	const newPath = `${window.location.pathname}?${newParams.toString()}`

	return newPath
}

export const fetchCars = async (filters: FilterProps) => {
	const {manufacturer, year, model, limit, fuel} = filters

	const headers: HeadersInit = {
		'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '' ,
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}

	try {
		const res = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
			headers
		})

		const data = res.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

export const generateCarImageurl = (car: CarProps, angle?: string) => {
	const url = new URL(`https://cdn.imagin.studio/getimage`)

	url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '')
	// url.searchParams.append('customer', "hrjavascript-mastery")
	url.searchParams.append('make', car.make)
	url.searchParams.append('modelFamily', car.model.split(' ')[0])
	url.searchParams.append('zoomType', 'fullscreen')
	url.searchParams.append('modelYear', `${car.year}`)
	// url.searchParams.append('zoomLevel', zoomLevel);
	url.searchParams.append('angle', `${angle}`)

	return `${url}`
}


