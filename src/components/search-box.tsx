import React, {type Dispatch, type SetStateAction} from 'react'

import {Combobox, Dialog, Transition} from '@headlessui/react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {categories} from 'assets/categories'

import {type CategoryLocal} from 'types/places'

export default function SearchBox({
	isOpen,
	setIsOpen,
	setSearchQuery,
}: {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setSearchQuery: Dispatch<SetStateAction<string | number>>
}) {
	const [queryTemp, setQueryTemp] = React.useState('')
	const deferredQueryTemp = React.useDeferredValue(queryTemp)

	const filteredCategories = React.useMemo(
		() =>
			categories.filter((category) =>
				category.label.toLowerCase().includes(queryTemp.toLowerCase())
			),
		[deferredQueryTemp]
	)

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryTemp(e.target.value)
	}

	const onInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement
		if (e.key === 'Enter') {
			setSearchQuery(target.value)
			setIsOpen(false)
		}
	}

	const onSelectOption = (category: CategoryLocal) => {
		setSearchQuery(category.id)
	}

	const onLeaveSearch = () => {
		setQueryTemp('')
	}

	return (
		<Transition.Root show={isOpen} as='form' afterLeave={onLeaveSearch}>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto p-4 pt-6 sm:p-6 md:p-20'
				onClose={setIsOpen}
			>
				<Transition.Child
					as={React.Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Dialog.Overlay className='fixed inset-0 bg-dark-bg bg-opacity-50 transition-opacity' />
				</Transition.Child>

				<Transition.Child
					as={React.Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<Combobox
						as='div'
						className='mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all'
						onChange={onSelectOption}
					>
						<div className='relative'>
							<MagnifyingGlassIcon
								className='pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-900 text-opacity-40'
								aria-hidden='true'
							/>
							<Combobox.Input
								className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:ring-0'
								placeholder='Search what you want...'
								onChange={onInputChange}
								onKeyDown={onInputEnter}
							/>
						</div>

						{filteredCategories.length > 0 && (
							<Combobox.Options
								static
								className='max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-dark-body'
							>
								{filteredCategories.map((category) => (
									<Combobox.Option
										key={category.id}
										value={category}
										className={({active}) => `
											cursor-default select-none py-2 px-4
											${active ? 'bg-primary-darker text-white' : ''}
										`}
									>
										{category.label}
									</Combobox.Option>
								))}
							</Combobox.Options>
						)}
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	)
}
