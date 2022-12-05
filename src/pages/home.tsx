import React from 'react'
import NavbarTopLayout from 'layouts/navbar'
import SearchBox from 'components/search-box'
import {
	StarIcon,
	MapIcon,
	BanknotesIcon,
	HeartIcon,
	CheckBadgeIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'

import {useSearchPlaces} from 'utils/hooks'
import {roundDistance, kThousand} from 'utils/format'
import {defaultCategoryId} from 'utils/constant'

import {type PlaceList} from 'types/place'
import {Link} from '@tanstack/react-router'

function HomePage() {
	const [isSearchOpen, setIsSearchOpen] = React.useState(false)
	const [searchQuery, setSearchQuery] = React.useState<string | number>(
		defaultCategoryId
	)
	const {isLoading, isError, data, error} = useSearchPlaces(searchQuery)
	const isEmpty = !data || data.length === 0

	const onSearchClick = () => {
		setIsSearchOpen(true)
	}

	return (
		<NavbarTopLayout>
			<main className='flex w-full flex-col items-center gap-8 px-8'>
				<h1 className='text-2xl md:mt-4 md:text-3xl lg:mt-4 lg:text-4xl'>
					Best Picks Near You
				</h1>

				<div className='container grid grid-cols-6 gap-4 md:gap-6 md:px-4 xl:mt-4 xl:px-32'>
					{isLoading ? (
						<LoadingCard />
					) : isError ? (
						<ErrorCard error={error} />
					) : isEmpty ? (
						<EmptyCard />
					) : (
						data.map((place) => <Card key={place.fsq_id} {...place} />)
					)}
				</div>
			</main>

			<button
				className={`
					fixed bottom-16 right-4 rounded-full bg-secondary-darkest bg-opacity-60 p-2.5 shadow-lg shadow-secondary-darkest backdrop-blur-lg transition-all hover:bg-opacity-80 hover:shadow-primary-darkest active:translate-y-2 md:bottom-12 md:right-6 lg:right-8 xl:right-10 
					${isSearchOpen ? 'blur' : ''}
				`}
				onClick={onSearchClick}
			>
				<MagnifyingGlassIcon className='h-8 w-8 text-light-bg' />
			</button>
			<SearchBox
				isOpen={isSearchOpen}
				setIsOpen={setIsSearchOpen}
				setSearchQuery={setSearchQuery}
			/>
		</NavbarTopLayout>
	)
}

// eslint-disable-next-line @typescript-eslint/ban-types
const ErrorCard = ({error}: {error: Error | null}) => (
	<div className='col-span-full'>
		<p>Error</p>
		{error && <p>{error.message}</p>}
	</div>
)

const LoadingCard = () => (
	<div className='col-span-full'>
		<p>Loading ...</p>
	</div>
)

const EmptyCard = () => (
	<div className='col-span-full'>
		<p>No place is found</p>
	</div>
)

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
}: PlaceList) {
	const noPhoto = photos.length === 0

	tastes?.sort((a, b) => a.length - b.length)
	const tastesBottom: string[] = []
	const tastesTop: string[] = []
	tastes?.forEach((taste, i) => {
		if ((i + 1) % 2 === 1) {
			tastesBottom.push(taste)
		} else {
			tastesTop.push(taste)
		}
	})

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
		<Link
			key={fsq_id}
			to='/place/$id'
			params={{id: fsq_id}}
			className='relative col-span-full flex h-48 rounded-xl bg-primary-darkest shadow-lg shadow-secondary-darkest md:col-span-3 xl:col-span-2'
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
									src={photo.prefix + '144x192' + photo.suffix}
									alt={name + "'s photo"}
									className='h-48'
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
						{/* <div className='centered h-4 w-4 rounded-full bg-light-bg' /> */}
						<CheckBadgeIcon className='centered h-6 w-6 text-secondary-lighter' />
					</div>

					{/* #TASTES */}
					<div className='hide-scrollbar absolute left-2 bottom-2 w-32 space-y-1 overflow-y-hidden whitespace-nowrap rounded-lg'>
						{[tastesTop, tastesBottom].map((tastes, i) => (
							<div className='h-4 space-x-0.5' key={`tastes-${i}`}>
								{tastes.map((taste) => (
									<p
										key={taste}
										className='inline rounded-full bg-primary-darker/75 px-2 align-top text-xs font-semibold'
									>
										{taste}
									</p>
								))}
							</div>
						))}
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
				<div className='-mt-0.5 grid grid-cols-12 gap-x-1.5'>
					<p className='col-span-7 text-base font-semibold text-opacity-80'>
						<StarIcon
							className='inline h-5 w-5 align-text-top text-yellow-400/75'
							aria-label='rating'
						/>
						<span>&nbsp;{rating ?? '-'}&nbsp;</span>
						{stats?.total_ratings && (
							<span>({kThousand(stats.total_ratings)})</span>
						)}
					</p>
					<p className='col-span-5 text-base font-semibold text-opacity-80'>
						<HeartIcon
							className='inline h-5 w-5 align-text-top text-red-400/75'
							aria-label='distance'
						/>
						<span>&nbsp;{stats?.total_tips}</span>
					</p>

					<p className='col-span-7 text-base font-semibold text-opacity-80'>
						<MapIcon
							className='inline h-5 w-5 align-text-top text-blue-400/75'
							aria-label='distance'
						/>
						<span>&nbsp;{roundDistance(distance)}</span>
					</p>
					<p className='col-span-5 text-base font-semibold text-opacity-80'>
						<BanknotesIcon
							className='inline h-5 w-5 align-text-top text-green-400/75'
							aria-label='price'
						/>
						<span>
							&nbsp;
							{Array.from({length: price ?? 0}, () => '$').join('')}
						</span>
					</p>
					<p className='col-span-full mt-0.5 text-sm font-semibold italic leading-4 text-opacity-80 line-clamp-2'>
						{location.address}
					</p>
				</div>

				{/* #CATEGORIES */}
				<div className='hide-scrollbar mt-1 space-x-2 overflow-auto whitespace-nowrap rounded-xl'>
					{categories.map(({id, icon, name}) => (
						<div
							key={id}
							className='inline-flex items-center gap-1 rounded-full bg-secondary-normal pl-1 pr-3 align-middle'
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
		</Link>
	)
}

export default HomePage
