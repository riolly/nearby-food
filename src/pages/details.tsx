import * as React from 'react'
import NavbarLayout from 'layouts/navbar'
import {useMatch} from '@tanstack/react-router'
import {usePlaceDetails} from 'utils/hooks'
import {type PlaceDetails} from 'types/place'

const DetailsPage = () => {
	const {params} = useMatch('/place/$id')
	const {isLoading, isError, error, data} = usePlaceDetails(params.id)
	const isEmpty = !data

	return (
		<NavbarLayout>
			<main className='flex w-full flex-col items-center gap-8 px-8'>
				<div className='container'>
					{isLoading ? (
						<LoadingCard />
					) : isError ? (
						<ErrorCard error={error} />
					) : isEmpty ? (
						<EmptyCard />
					) : (
						<DetailedCard {...data} />
					)}
				</div>
			</main>
		</NavbarLayout>
	)
}

const DetailedCard = ({name, description}: PlaceDetails) => {
	console.log()
	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
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
