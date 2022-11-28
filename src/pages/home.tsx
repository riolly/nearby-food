import React from 'react'
import NavbarTopLayout from 'layouts/navbar'
import {usePlaces} from 'utils/hooks'

function HomePage() {
	const {data, isError, isLoading, error} = usePlaces()

	return (
		<NavbarTopLayout>
			<main className='flex flex-col items-center gap-8'>
				<h1>Food & Beverages Near You</h1>

				<div className='grid grid-cols-3 gap-2'>
					{isLoading ? (
						<p>Loading ...</p>
					) : isError ? (
						<p>Error: {error.message}</p>
					) : (Array.isArray(data) && data.length === 0) || data === null ? (
						<p>Empty ...</p>
					) : (
						data.map((place) => (
							<div
								key={place.fsq_id}
								className='col-span-full rounded-xl bg-primary-lightest/20 p-6'
							>
								<h2>{place.name}</h2>
							</div>
						))
					)}
				</div>
			</main>
		</NavbarTopLayout>
	)
}

export default HomePage
