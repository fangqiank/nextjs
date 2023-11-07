'use client'

import {Fragment, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '../../../types'
import { updateSearchParam } from '../../../utils'

export const CustomFilter = ({title, options}: CustomFilterProps) => {
	const router = useRouter()
	const [selected, setSelected] = useState(options[0])

	const handleUpdate = (e: {
		title: string,
		value: string
	}) => {
		const newPath = updateSearchParam(title, e.value.toLowerCase())

		router.push(newPath)
	}

	const contents = (
		<div className="w-fit">
			<Listbox
				value={selected}
				onChange={e => {
					setSelected(e)
					handleUpdate(e)
				}}
			>
				<div className="relative w-fit z-10">
					<Listbox.Button className='custom-filter__btn'>
						<span className="block truncate">{selected.title}</span>
						<Image
							className='ml-4 object-contain'
							src='/chevron-up-down.svg'
							alt='up-down'
							width={20}
							height={20} 
						/>
					</Listbox.Button>

					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='custom-filter__options'>
							{options.map(op => (
								<Listbox.Option
									key={op.title}
									value={op}
									className={({active}) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
								>
									{
										({selected}) => (
											<>
												<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
													{op.title}
												</span>
											</>
										)
									}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	)

	return contents
}