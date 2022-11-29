import React from 'react'
import NavbarTopLayout from 'layouts/navbar'

import {
	StarIcon,
	MapIcon,
	BanknotesIcon,
	HeartIcon,
	CheckBadgeIcon,
	ChevronUpIcon,
	ChevronDownIcon,
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
	tastes,
}: Place) {
	const noPhoto = photos.length === 0

	let tastes0: string[] = []
	let tastes1: string[] = []
	if (tastes) {
		const middleIdx = Math.floor(tastes.length / 2)
		tastes0 = [...tastes].splice(0, middleIdx)
		tastes1 = [...tastes].splice(middleIdx)
	}

	const [photoActiveId, setPhotoActiveId] = React.useState(0)

	const handlePhotosSnap = (event: React.UIEvent<HTMLDivElement>) => {
		const parentY = event.currentTarget.getBoundingClientRect().y
		Array.from(event.currentTarget.children).forEach((child, i) => {
			const childY = child.getBoundingClientRect().y
			if (childY === parentY) {
				setPhotoActiveId(i)
			}
		})
	}

	const getChevronClassName = (move: 'up' | 'down') => {
		if (noPhoto) return ''

		const activeClassName =
			move === 'up'
				? photoActiveId === 0
					? 'bg-opacity-40 text-slate-500'
					: 'bg-opacity-70 text-white'
				: photoActiveId === photos.length - 1
				? 'bg-opacity-40 text-slate-500'
				: 'bg-opacity-70 text-white'

		return `h-3 w-3 rounded-full bg-dark-bg p-[1px] ${activeClassName}`
	}

	return (
		<div
			key={fsq_id}
			className='relative flex h-48 rounded-xl bg-primary-darkest shadow-lg shadow-secondary-darkest '
		>
			{!noPhoto && (
				<>
					{/* #PHOTOS */}
					<div
						className='hide-scrollbar relative w-36 snap-y snap-mandatory overflow-y-scroll rounded-l-xl [direction:rtl]'
						onScroll={handlePhotosSnap}
					>
						{photos.map((photo) => (
							<div key={photo.id} className='snap-center rounded-l-lg'>
								<img
									src={photo.prefix + '200x200' + photo.suffix}
									alt={name + "'s photo"}
									className='h-48 object-cover'
								/>
							</div>
						))}
					</div>

					{/* #SCROLLBAR INDICATOR */}
					{photos.length > 1 && (
						<div className='absolute top-1/2 left-1 flex -translate-y-1/2 flex-col items-center gap-1'>
							<ChevronUpIcon className={getChevronClassName('up')} />
							{photos.map((photo, i) => (
								<div
									key={photo.id}
									className={`
										relative rounded-full bg-dark-bg
										${i === photoActiveId ? 'h-2 w-2 bg-opacity-70' : 'h-1 w-1 bg-opacity-40'}
									`}
								>
									{i === photoActiveId && (
										<div className='centered h-1 w-1 rounded-full bg-light-bg/75' />
									)}
								</div>
							))}
							<ChevronDownIcon className={getChevronClassName('down')} />
						</div>
					)}

					{/* #VERIFIED BADGE */}
					<div className='absolute left-36 top-2 h-[30px] w-[30px] -translate-x-1/2 rounded-full bg-primary-darkest'>
						<div className='centered h-4 w-4 rounded-full bg-light-bg' />
						<CheckBadgeIcon className='centered h-6 w-6 text-secondary-lighter' />
					</div>

					{/* #TASTES */}
					<div className='hide-scrollbar absolute left-2 bottom-2 w-32 overflow-scroll overflow-y-hidden whitespace-nowrap rounded rounded-t-xl'>
						<div className='h-5 space-x-0.5'>
							{tastes0?.map((taste) => (
								<p
									key={taste}
									className='inline rounded-full bg-primary-darker/75 px-2 text-xs font-semibold '
								>
									{taste}
								</p>
							))}
						</div>
						<div className='h-5 space-x-0.5'>
							{tastes1?.map((taste) => (
								<p
									key={taste}
									className='inline rounded-full bg-primary-darker/75 px-2 text-xs font-semibold '
								>
									{taste}
								</p>
							))}
						</div>
					</div>
				</>
			)}

			{/* #CONTENT CONTAINER */}
			<div
				className={`
					flex h-full min-w-0 flex-1 flex-col gap-2 rounded-r-lg px-4 pt-3 pb-2
					${noPhoto ? 'rounded-l-lg' : ''}
				`}
			>
				{/* #TITLE */}
				<h2 className='text-base leading-6 tracking-tighter line-clamp-2'>
					{name}
				</h2>

				{/* #DETAILS */}
				<div className=''>
					<div className='grid grid-cols-12'>
						<p className='col-span-7 text-base font-semibold text-opacity-80'>
							<StarIcon
								className='inline h-5 w-5 align-text-top text-secondary-lightest/75'
								aria-label='rating'
							/>
							<span>&nbsp;{rating ?? '-'}&nbsp;</span>
							{stats?.total_ratings && <span>({stats.total_ratings})</span>}
						</p>
						<p className='col-span-5 text-base font-semibold text-opacity-80'>
							<HeartIcon
								className='inline h-5 w-5 align-text-top text-primary-lighter/75'
								aria-label='distance'
							/>
							<span>&nbsp;{stats?.total_tips}</span>
						</p>
					</div>

					<div className='grid grid-cols-12'>
						<p className='col-span-7 text-base font-semibold text-opacity-80'>
							<MapIcon
								className='inline h-5 w-5 align-text-top text-blue-500/75'
								aria-label='distance'
							/>
							<span>&nbsp;{roundDistance(distance)}</span>
						</p>
						<p className='col-span-5 text-base font-semibold text-opacity-80'>
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

					<p className='mt-0.5 text-base font-semibold italic leading-4 text-opacity-80 line-clamp-2'>
						{location.address}
					</p>
				</div>

				{/* #CATEGORIES */}
				<div className='hide-scrollbar mt-0.5 space-x-2 overflow-auto whitespace-nowrap'>
					{categories.map(({id, icon, name}) => (
						<div
							key={id}
							className='inline-flex items-center gap-1 rounded-full bg-secondary-normal pl-1 pr-3'
						>
							<img
								src={icon.prefix + '32' + icon.suffix}
								className='h-6 w-6 rounded-full '
							/>

							<p className='text-sm font-semibold text-dark-body/80'>
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
