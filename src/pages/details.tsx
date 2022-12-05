import * as React from 'react'
import NavbarLayout from 'layouts/navbar'
import {useMatch} from '@tanstack/react-router'
import {usePlaceDetails, usePhotos} from 'utils/hooks'
import {
	type SortTypes,
	type PlaceDetails,
	type ClassificationTypes,
	photosSort,
	photosClassifications,
} from 'types/place'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid'

const DetailsPage = () => {
	const {params} = useMatch('/place/$id')
	const {isLoading, isError, error, data} = usePlaceDetails(params.id)
	const isEmpty = !data

	return (
		<NavbarLayout containerClassName='pt-0 bg-dark-bg/20 pb-0'>
			<main className='w-full'>
				{isLoading ? (
					<LoadingCard />
				) : isError ? (
					<ErrorCard error={error} />
				) : isEmpty ? (
					<EmptyCard />
				) : (
					<DetailedCard {...data} />
				)}
			</main>
		</NavbarLayout>
	)
}

const DetailedCard = ({fsq_id, name, categories}: PlaceDetails) => {
	const [sort, setSort] = React.useState<SortTypes>('popular')
	const [classifications, setClassifications] =
		React.useState<ClassificationTypes>('all')
	const {data, isLoading, isError, error} = usePhotos({
		id: fsq_id,
		sort,
		classifications,
	})
	const isEmpty = !data

	const [photoActiveId, setPhotoActiveId] = React.useState(0)

	const handlePhotosSnap = (event: React.UIEvent<HTMLDivElement>) => {
		const parentY = event.currentTarget.getBoundingClientRect().x
		Array.from(event.currentTarget.children).forEach((child, i) => {
			const childY = child.getBoundingClientRect().x
			if (childY === parentY) {
				setPhotoActiveId(i)
			}
		})
	}

	const getChevronClassName = (move: 'left' | 'right') => {
		if (isEmpty) return ''

		const activeClassName =
			move === 'left'
				? photoActiveId === 0
					? 'bg-opacity-40 text-slate-500'
					: 'bg-opacity-70 text-white'
				: photoActiveId === data.length - 1
				? 'bg-opacity-40 text-slate-500'
				: 'bg-opacity-70 text-white'

		return `absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-dark-bg p-[1px] ${activeClassName}`
	}

	const photoContainerRef = React.useRef<HTMLDivElement>(null)

	return (
		<div className='h-full min-h-screen space-y-4 bg-dark-bg/20'>
			{/* #PHOTOS */}
			<div className='bg-red-200s'>
				{/* SNAP */}
				<div
					className='bg-blue-200s hide-scrollbar relative h-60 w-full snap-x snap-mandatory overflow-x-scroll whitespace-nowrap rounded-b-xl shadow-xl shadow-primary-darkest/75'
					onScroll={handlePhotosSnap}
					ref={photoContainerRef}
				>
					{isLoading ? (
						<LoadingCard />
					) : isError ? (
						<ErrorCard error={error} />
					) : isEmpty ? (
						<EmptyCard />
					) : (
						data.map((photo) => (
							<div
								key={`${sort}_${classifications}_${photo.id}`}
								className='bg-green-200s inline-block h-60 w-full snap-center align-top'
							>
								<img
									src={photo.prefix + '800x480' + photo.suffix}
									className='h-full w-full object-cover'
								/>
							</div>
						))
					)}
				</div>

				{data && data.length > 1 && (
					<>
						<button
							className='bg-red-200s absolute top-0 h-60 w-8 px-1'
							onClick={() => {
								const container = photoContainerRef.current
								if (container) {
									container.scrollLeft -= container.clientWidth
								}
							}}
						>
							<ChevronLeftIcon className={getChevronClassName('left')} />
						</button>
						<button
							className='bg-red-200s absolute top-0 right-0 h-60 w-8 px-1'
							onClick={() => {
								const container = photoContainerRef.current
								if (container) {
									container.scrollLeft += container.clientWidth
								}
							}}
						>
							<ChevronRightIcon className={getChevronClassName('right')} />
						</button>
						<div className='bg-red-200s absolute top-[13.5rem] flex h-6 w-full items-center justify-center gap-1 py-1'>
							{data.map((photo, i) => (
								<div
									key={photo.id}
									className={`
											relative inline-block rounded-full bg-dark-bg
											${
												i === photoActiveId
													? 'h-3.5 w-3.5 bg-opacity-70'
													: 'h-2.5 w-2.5 bg-opacity-50'
											}
											`}
								>
									{i === photoActiveId && (
										<div className='centered h-2 w-2 rounded-full bg-light-bg/75' />
									)}
								</div>
							))}
						</div>
					</>
				)}

				{/* #SORT */}
				<div className='bg-green-200s mt-1.5 px-8'>
					<div className='hide-scrollbar bg-purple-200s h-fit space-x-1 overflow-y-auto whitespace-nowrap'>
						{photosSort.map((type) => (
							<button
								key={type}
								onClick={() => {
									setSort(type)
									setClassifications('all')
								}}
								className={`rounded-full bg-secondary-darker px-2 font-body text-base font-semibold leading-5 ${
									type === sort
										? 'border-2 border-secondary-normal bg-opacity-75'
										: ''
								}`}
							>
								{type}
							</button>
						))}
						{photosClassifications.map((classification) => (
							<button
								key={classification}
								onClick={() => {
									setClassifications(classification)
								}}
								className={`rounded-full bg-primary-darker px-2 font-body text-base font-semibold leading-5 ${
									classification === classifications
										? 'border-2 border-primary-normal bg-opacity-75'
										: ''
								}`}
							>
								{classification}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className='bg-red-200s h-96 px-8'>
				<div className=''>
					<h1 className='text-2xl'>{name}</h1>
				</div>
				<div className='hide-scrollbar space-x-2 overflow-auto whitespace-nowrap rounded-xl'>
					{categories.map(({id, name}, i) => (
						<span key={id} className='text-sm font-semibold text-opacity-75'>
							{name.replace(' Restaurant', '')}
							{i !== categories.length - 1 && (
								<span className='ml-2 align-middle text-sm text-opacity-75'>
									&bull;
								</span>
							)}
						</span>
					))}
				</div>
			</div>
		</div>
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

export default DetailsPage
