'use client'

import {useQuery, useMutation} from 'convex/react'
import {useState} from 'react'
import { ProductCard } from '../(components)/ProductCard'
import { api } from '@/convex/_generated/api'
import {Id} from '@/convex/_generated/dataModel'

const CreatePage = () => {
	const products = useQuery(api.products.get)
	const [selected, setSelected] = useState<Set<Id<'products'>>>(new Set())
	const [title, setTitle] = useState("")
	const addOutfit = useMutation(api.outfits.add)

	return products 
		? (
			<>
				<div className="flex flex-row gap-2 my-5">
					<input 
						type="text"
						className='flex-grow bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500'
						placeholder='Name your outfit' 
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>

					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						onClick={async () => {
							await addOutfit({
								title,
								products: Array.from(selected)
							})
							setTitle('')
							setSelected(new Set())
						}}
					>
						Add outfit
					</button>
				</div>
				<h2 className="px-5 text-3xl mb-2 font-bold">select your product</h2>
				<ul
					role='list'
					className='flex flex-row flex-wrap gap-2 mt-2'
				>
					{products.map(prod => (
						<li
							key={prod._id}
							className={`border-4 rounded-xl ${selected.has(prod._id) ? 'border-red-600 bg-zinc-800' : 'border-gray-800'}`}
							onClick={() => setSelected(sel => {
								const newSelected = new Set(sel)

								if(newSelected.has(prod._id))
									newSelected.delete(prod._id)
								else
									newSelected.add(prod._id)

								return newSelected
							})}
						>
							<ProductCard
								{...prod}
								fixedWidth 
							/>
						</li>
					))}
				</ul>
			</>
		) 
		: null
}

export default CreatePage