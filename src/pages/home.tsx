import React from 'react'
import NavbarTopLayout from 'layouts/navbar'

import {
	MapPinIcon,
	StarIcon,
	MapIcon,
	BanknotesIcon,
	HeartIcon,
} from '@heroicons/react/24/solid'

import {usePlaces} from 'utils/hooks'
import {roundDistance} from 'utils/format'

import {type Place} from 'types/places'

function HomePage() {
	const {data, isError, isLoading, error} = usePlaces()

	return (
		<NavbarTopLayout>
			<main className='flex w-full flex-col items-center gap-8 px-8'>
				<h1>Food & Beverages Near You</h1>

				<div className='w-full space-y-4'>
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

function Card({
	fsq_id,
	name,
	location,
	distance,
	photos,
	categories,
	rating,
	stats,
	price,
}: Place) {
	const noPhoto = photos.length === 0

	return (
		<div
			key={fsq_id}
			className='flex h-48 rounded-lg bg-primary-darkest/75 shadow-lg shadow-secondary-darkest'
		>
			{!noPhoto && (
				<img
					src={photos[0].prefix + '200x200' + photos[0].suffix}
					alt={name + "'s photo"}
					className='w-36 rounded-l-lg object-center'
				/>
			)}
			<div
				className={`
					flex h-full min-w-0 flex-1 flex-col gap-2 rounded-r-lg px-4 py-3
					${noPhoto ? 'rounded-l-lg' : ''}
				`}
			>
				<h2 className='leading-6 tracking-tighter line-clamp-2'>{name}</h2>

				<div className='text-base'>
					<div className='grid grid-cols-12'>
						<p className='col-span-7'>
							<StarIcon
								className='inline h-5 w-5 align-text-top text-secondary-lightest/75'
								aria-label='rating'
							/>
							<span>&nbsp;{rating ?? '-'}&nbsp;</span>
							{stats?.total_ratings && <span>({stats.total_ratings})</span>}
						</p>
						<p className='col-span-5'>
							<HeartIcon
								className='inline h-5 w-5 align-text-top text-primary-lighter/75'
								aria-label='distance'
							/>
							<span>&nbsp;{stats.total_tips}</span>
						</p>
					</div>

					<div className='grid grid-cols-12'>
						<p className='col-span-7'>
							<MapIcon
								className='inline h-5 w-5 align-text-top text-secondary-lightest/75'
								aria-label='distance'
							/>
							<span>&nbsp;{roundDistance(distance)}</span>
						</p>
						<p className='col-span-5'>
							<BanknotesIcon
								className='inline h-5 w-5 align-text-top text-green-500/75'
								aria-label='price'
							/>
							<span>
								&nbsp;
								{Array.from({length: price ?? 0}, () => '$').join('')}
							</span>
						</p>
					</div>

					<p className='truncate leading-5'>
						<MapPinIcon
							className='float-left mr-0.5 h-full w-5 text-secondary-lightest/75'
							aria-label='address'
						/>
						<span className=''>{location.address}</span>
					</p>
				</div>

				<div className='hide-scrollbar mt-1 space-x-2 overflow-auto whitespace-nowrap'>
					{categories.map(({id, icon, name}) => (
						<div
							key={id}
							className='inline-flex items-center gap-1 rounded-full bg-secondary-normal pl-1 pr-3'
						>
							<img
								src={icon.prefix + '32' + icon.suffix}
								className='h-6 w-6 rounded-full '
							/>

							<p className='text-sm font-semibold text-dark-body'>
								{name.replace(' Restaurant', '')}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default HomePage
