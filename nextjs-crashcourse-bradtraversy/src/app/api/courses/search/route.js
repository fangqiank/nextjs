import { NextResponse } from 'next/server'
import courses from '../data.json'

export const GET = async (request) => {
	const {searchParams} = new URL(request.url)
	const query = searchParams.get('query')
	const filteredCourses = courses.filter(x => 
		x.title.toLowerCase().includes(query.toLowerCase()))

	return NextResponse.json(filteredCourses)
}

