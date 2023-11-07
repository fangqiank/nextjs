import { NextResponse } from "next/server"
import {v4 as uuid} from 'uuid'
import courses from "./data.json"

export const GET = async (request) => NextResponse.json(courses)

export const POST = async (request) => {
	console.log(await request.json());
	const {title, description, level, link} = await request.json()

	const newCourse = {
		id: uuid(),
		title,
		description,
		level,
		link
	}

	courses.push(newCourse)

	return NextResponse.json(courses)
}