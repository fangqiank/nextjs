'use client'

import Link from "next/link"
import {useObservable, observer, enableLegendStateReact} from '@legendapp/state/react'
import {ObservableObject} from '@legendapp/state'

enableLegendStateReact()

const Fullname = (
	{
		person
	}: {
		person: ObservableObject<{
			first:string, 
			last: string
		}>
}) => (
	<div>{person.first} {person.last}</div>
)

const FirstName = observer(
	({
		person
	}: {
			person: ObservableObject<{
				first:string, 
				last: string
			}>
	}) => (
		<div className="flex gap-2">
			<label htmlFor="first">First Name</label>
			
			<input 
				type="text"
				id="first"
				value={person.first.get()}
				onChange={e => person.first.set(e.target.value)}
				className="border-2 border-gray-300 rounded-md text-black" 
			/>
		</div>
	)
)

const LastName = observer(
	({
		person
	}: {
			person: ObservableObject<{
				first:string, 
				last: string
			}>
	}) => (
		<div className="flex gap-2">
			<label htmlFor="last">Last Name</label>
			<input 
				type="text"
				id="last"
				value={person.last.get()}
				onChange={e => person.last.set(e.target.value)}
				className="border-2 border-gray-300 rounded-md text-black" 
			/>
		</div>
	)
)

const LocalPage = () => {
	const person = useObservable({
		first: 'li',
		last: 'si'
	})

	const contents = (
		<div className="flex flex-col gap-2 m-5">
			<div className="mb-5 text-4xl font-bold flex">
				<Link
					href='/'
					className="font-thin"
				>
					Home
				</Link>

				<span className="font-thin mx-2">&gt;</span>
				<h1>Local and Fine Grained Reactivity</h1>
			</div>
			
			<FirstName person={person} />
			<LastName person={person} />

			<Fullname person={person} />
			
		</div>
	)

	return contents
}

export default LocalPage