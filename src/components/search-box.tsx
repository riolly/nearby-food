import React, {type Dispatch, type SetStateAction} from 'react'

import {Combobox, Dialog, Transition} from '@headlessui/react'
import {ChevronRightIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {categories} from 'assets/categories'

import {BuildingStorefrontIcon} from '@heroicons/react/24/outline'

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

	const onSelectOption = (category: {id: string; label: string}) => {
		if (category.id) {
			setSearchQuery(category.id)
		} else {
			setSearchQuery(category.label)
		}

		setIsOpen(false)
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
						className='mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-light-bg shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all'
						onChange={onSelectOption}
					>
						<div className='relative'>
							<MagnifyingGlassIcon
								className='pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-dark-bg text-opacity-40'
								aria-hidden='true'
							/>
							<Combobox.Input
								className='h-12 w-full border-0 bg-transparent pl-11 pr-4 font-body text-sm text-dark-bg placeholder-gray-500 focus:ring-0'
								placeholder='Search what you want...'
								onChange={onInputChange}
								onKeyDown={onInputEnter}
							/>
						</div>

						<Combobox.Options
							static
							className='max-h-[21rem] scroll-py-2 overflow-y-auto text-sm text-dark-heading'
						>
							{queryTemp && (
								<Combobox.Option
									value={{id: 0, label: queryTemp, name: ''}}
									className={({active}) => `
										cursor-default select-none p-4
										${active ? 'bg-primary-darker/80 text-light-heading' : ''}
									`}
								>
									Search {queryTemp}...
								</Combobox.Option>
							)}

							{filteredCategories.length > 0 && (
								<>
									<div className='flex cursor-default select-none items-center bg-primary-normal/20 px-4 py-2 text-primary-darkest'>
										<span className='flex-auto truncate text-dark-heading'>
											Categories
										</span>
										<BuildingStorefrontIcon
											className='h-6 w-6 flex-none  text-opacity-40'
											aria-hidden='true'
										/>
									</div>

									{filteredCategories.map((category) => (
										<Combobox.Option
											key={category.id}
											value={category}
											className={({active}) => `
											flex cursor-default select-none items-center gap-2 py-2 px-4 font-body
											${active ? 'bg-primary-darker/80 text-light-heading' : 'bg-light-heading'}
											`}
										>
											<ChevronRightIcon className='h-4 w-4' /> {category.label}
										</Combobox.Option>
									))}
								</>
							)}
						</Combobox.Options>
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	)
}
