'use client'

import {createContext, useContext} from 'react'
import Link from 'next/link'
import {observer, enableLegendStateReact, useComputed, useObservable} from '@legendapp/state/react'
import {Observable, ObservableComputed} from '@legendapp/state'

enableLegendStateReact()

const PersonProvider = createContext<{
	first: Observable<string>,
	last: Observable<string>,
	full: ObservableComputed<string>
} | null>(null)

const usePerson = () => useContext(PersonProvider)!

const Name = () => {
	const {full} = usePerson()
	return (
		<div>{full}</div>
	)
}

const First = observer(() => {
	const {first} = usePerson()

	return (
		<div className='flex gap-2'>
			<label htmlFor="first">First Name</label>
			
			<input 
				type="text"
				id='first'
				className='border-2 border-gray-300 rounded-md text-black'
				value={first.get()}
				onChange={e => first.set(e.target.value)} 
			/>
		</div>
	)
})

const InnerContainer = () => (
	<div className='flex flex-col gap-2'>
		<First />
		<Last />
		<Name />
	</div>
) 

const OutContainer = () => (
	<InnerContainer />
)

const FormContainer = () => {
	const first = useObservable('zhang')
	const last = useObservable('san')
	const full = useComputed(() => `${first.get()} ${last.get()}`)

	return (
		<PersonProvider.Provider  value={{first, last, full}}>
			<OutContainer />
		</PersonProvider.Provider>
	)
}

const Last = observer(() => {
	const {last} = usePerson()

	return (
		<div className='flex gap-2'>
			<label htmlFor="last">Last Name</label>
			
			<input 
				type="text"
				id='last'
				className='border-2 border-gray-300 rounded-md text-black'
				value={last.get()}
				onChange={e => last.set(e.target.value)} 
			/>
		</div>
	)
})

const Page = () => {
	return (
		<div className='m-5'>
			<div className="mb-5 text-4xl font-bold flex">
				<Link
					href='/'
					className='font-thin'
				>
					Home
				</Link>

				<span className="font-thin mx-2">&gt;</span>

				<h1>Context and Computed</h1>
			</div>

			<FormContainer />

			<div className="mt-10">
				<FormContainer />
			</div>
		</div>
	)
}

export default Page
