import React from 'react'
import NavbarTopLayout from 'layouts/navbar'

import {MapPinIcon} from '@heroicons/react/24/solid'

import {usePlaces} from 'utils/hooks'
import {roundDistance} from 'utils/format'

import {type Place} from 'types/places'

function HomePage() {
	const {data, isError, isLoading, error} = usePlaces()

	return (
		<NavbarTopLayout>
			<main className='flex flex-col items-center gap-8 px-4'>
				<h1>Food & Beverages Near You</h1>

				<div className='grid grid-cols-3 gap-3'>
					{isLoading ? (
						<p>Loading ...</p>
					) : isError ? (
						<p>Error: {error.message}</p>
					) : (Array.isArray(data) && data.length === 0) || data === null ? (
						<p>Empty ...</p>
					) : (
						data.map((place) => <Card key={place.fsq_id} {...place} />)
					)}
				</div>
			</main>
		</NavbarTopLayout>
	)
}

function Card({fsq_id, name, location, distance, categories}: Place) {
	return (
		<div
			key={fsq_id}
			className='col-span-full rounded-xl bg-primary-lightest/20 py-4 px-6'
		>
			<h2>{name}</h2>

			<div className='mt-2 flex justify-between'>
				<div className='flex gap-2'>
					<div className='mt-1 w-fit'>
						<MapPinIcon className='h-5 w-5 text-secondary-normal' />
					</div>
					<p>{location.address}</p>
				</div>
				<div className='mt-1 w-fit'>
					<p className='w-16 text-right text-base font-semibold italic'>
						{roundDistance(distance)}
					</p>
				</div>
			</div>

			<div className='hide-scrollbar ml-6 mt-1 space-x-2 overflow-auto whitespace-nowrap'>
				{categories.map(({id, icon, name}) => (
					<div
						key={id}
						className='inline-flex items-center gap-1 rounded-full bg-secondary-normal pl-1 pr-3'
					>
						<img
							src={icon.prefix + '32' + icon.suffix}
							className='h-6 w-6 rounded-full'
						/>

						<p className='whitespace-nowrap text-sm font-semibold text-dark-body'>
							{name}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default HomePage
