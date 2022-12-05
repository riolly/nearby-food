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

const DetailsPage = () => {
	const {params} = useMatch('/place/$id')
	const {isLoading, isError, error, data} = usePlaceDetails(params.id)
	const isEmpty = !data

	return (
		<NavbarLayout containerClassName='pt-0 bg-dark-bg/20'>
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

const DetailedCard = ({fsq_id}: PlaceDetails) => {
	const [sort, setSort] = React.useState<SortTypes>('popular')
	const [classifications, setClassifications] =
		React.useState<ClassificationTypes>('all')
	const {data, isLoading, isError, error} = usePhotos({
		id: fsq_id,
		sort,
		classifications,
	})
	const isEmpty = !data

	return (
		<div className='h-full space-y-4 bg-dark-bg/20'>
			{/* #PHOTOS */}
			<div className='bg-red-200s'>
				{/* SNAP */}
				<div className='bg-blue-200s h-60 w-full snap-x snap-mandatory overflow-x-scroll whitespace-nowrap '>
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

				{/* #SORT */}
				<div className='bg-green-200s mt-1 px-8'>
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

			{/* <div className='h-96 bg-red-200 px-8'>
				<div className='h-12 bg-blue-200'></div>
			</div> */}
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
