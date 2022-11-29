import * as React from 'react'
import NavbarLayout from 'layouts/navbar'
import {MapIcon} from '@heroicons/react/24/solid'

export default function MapPage() {
	return (
		<NavbarLayout>
			<main className='flex w-full flex-col items-center gap-8 px-8'>
				<h1>Explore & Discover New Food</h1>

				<div className='container'>
					<div className='relative h-96 w-full'>
						<div className='h-full w-full rounded-xl bg-primary-darkest/75 blur' />
						<div className='centered flex flex-col items-center gap-4'>
							<MapIcon className=' h-24 w-24 text-secondary-normal' />
							<h2 className='text-center'>Map will be coming soon...</h2>
						</div>
					</div>
				</div>
			</main>
		</NavbarLayout>
	)
}
