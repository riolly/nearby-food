import * as React from 'react'
import NavbarLayout from 'layouts/navbar'
import {useMatch} from '@tanstack/react-router'
import {usePlaceDetails, usePhotos} from 'utils/hooks'

import {
	ArrowTrendingUpIcon,
	BanknotesIcon,
	CheckBadgeIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIcon,
	MapPinIcon,
} from '@heroicons/react/24/solid'

import {
	MdFreeBreakfast,
	MdLunchDining,
	MdBrunchDining,
	MdIcecream,
	MdDinnerDining,
	MdDeliveryDining,
	MdTakeoutDining,
	MdDriveEta,
	MdRestaurant,
	MdTouchApp,
	MdSmokingRooms,
	MdMusicNote,
	MdMeetingRoom,
	MdOutdoorGrill,
	MdOutlineAtm,
	MdLocalParking,
	MdTv,
} from 'react-icons/md'
import {
	FaRestroom,
	FaGuitar,
	FaWheelchair,
	FaMoneyBillWave,
} from 'react-icons/fa'
import {BsCreditCard2BackFill, BsApple} from 'react-icons/bs'
import {RiDiscFill} from 'react-icons/ri'
import {GiSecurityGate} from 'react-icons/gi'
import {IoBeer} from 'react-icons/io5'

import {
	type SortTypes,
	type PlaceDetails,
	type ClassificationTypes,
	photosSort,
	photosClassifications,
} from 'types/place'
import {type IconType} from 'react-icons'

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

const DetailedCard = ({
	fsq_id,
	name,
	categories,
	description,
	popularity,
	hours,
	price,
	features,
}: PlaceDetails) => {
	const [sort, setSort] = React.useState<SortTypes>('popular')
	const [classifications, setClassifications] =
		React.useState<ClassificationTypes>('food')
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
		<div className='h-full min-h-screen space-y-4 bg-dark-bg/20 pb-16'>
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

			{/* #TITLE SECTION */}
			<div className='bg-red-200s px-8'>
				<h1 className='text-2xl'>{name}</h1>

				<div className='flex items-center gap-1'>
					<CheckBadgeIcon className='h-5 w-5 text-secondary-lighter' />
					<span>|</span>
					<div className='hide-scrollbar flex-1 space-x-1 overflow-auto whitespace-nowrap'>
						{categories.map(({id, name}, i) => (
							<span
								key={id}
								className='align-middle text-sm font-semibold text-opacity-75'
							>
								{name}
								{i !== categories.length - 1 && (
									<span className='ml-1 align-middle text-xs text-opacity-75'>
										&bull;
									</span>
								)}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* #DESCRIPTION SECTION */}
			<div className='space-y-1 px-8'>
				<p className='leading-6 line-clamp-3'>{description}</p>
				<div className='flex gap-4'>
					{popularity >= 0.75 && (
						<div className='flex items-center gap-1 rounded-full'>
							<ArrowTrendingUpIcon className='inline h-6 w-6 text-secondary-lightest' />
							<p className='text-base font-semibold'>Trending</p>
						</div>
					)}
					<div className='flex items-center gap-1 rounded-full'>
						<ClockIcon
							className={`h-5 w-5 ${
								hours.open_now ? 'text-blue-600' : 'text-red-500'
							}`}
						/>
						<p className='text-base font-semibold'>
							{hours.open_now ? 'Open' : 'Close'}
						</p>
						<ChevronDownIcon className='h-4 w-4 text-light-body' />
					</div>
					<div className='flex items-center gap-1 rounded-full'>
						<MapPinIcon className='h-5 w-5 text-red-600' />
						<p className='text-base font-semibold'>Maps</p>
					</div>
					<div className='flex items-center gap-1 rounded-full'>
						<BanknotesIcon className='h-5 w-5 text-green-600' />
						<p className='text-base font-semibold'>
							{Array.from({length: price ?? 0}, () => '$').join('')}
						</p>
					</div>
				</div>
			</div>

			{/* #FEATURES SECTION */}
			<div className='space-y-2 px-8 pt-2 '>
				<Features features={features} />
			</div>
		</div>
	)
}

const Feature = ({Icon, label}: {label: string; Icon: IconType}) => (
	<div className='col-span-1 flex flex-col items-center gap-0.5'>
		<div className='rounded-full bg-primary-normal/50 p-2'>
			<Icon className='h-6 w-6 text-light-body' />
		</div>
		<span className='text-center text-sm leading-3'>{label}</span>
	</div>
)

// eslint-disable-next-line complexity
const Features = ({features}: {features: PlaceDetails['features']}) => {
	const {
		payment: {credit_cards: creditCards, digital_wallet: digitalWallet},
		food_and_drink: {meals, alcohol},
		services,
		amenities,
	} = features

	const hasAlcohol = Object.values(alcohol).some((drink) => drink)
	const hasMeals = Object.values(meals).some((meal) => meal)
	const hasFoodDrink = hasAlcohol || hasMeals

	return (
		<>
			<div className='rounded-lg bg-dark-bg/5 p-2'>
				<h2 className='align-right mb-2 text-sm italic'>Payments</h2>
				<div className='grid grid-cols-5 justify-center gap-2'>
					<Feature label='Cash' Icon={FaMoneyBillWave} />
					{creditCards.accepts_credit_cards && (
						<Feature label='Credit Card' Icon={BsCreditCard2BackFill} />
					)}
					{digitalWallet?.accepts_nfc && (
						<Feature label='Digital Wallet' Icon={BsApple} />
					)}
				</div>
			</div>
			<div className='rounded-lg bg-dark-bg/5 p-2'>
				<h2 className='mb-2 text-sm italic'>Services</h2>
				<div className='grid grid-cols-5 gap-2'>
					{services.delivery && (
						<Feature label='Delivery' Icon={MdDeliveryDining} />
					)}
					{services.takeout && (
						<Feature label='Take out' Icon={MdTakeoutDining} />
					)}
					{services.drive_through && (
						<Feature label='Drive through' Icon={MdDriveEta} />
					)}
					{services.dine_in && <Feature label='Dine in' Icon={MdRestaurant} />}
					{services.dine_in.reservations && (
						<Feature label='Reservation' Icon={MdTouchApp} />
					)}
				</div>
			</div>
			{hasFoodDrink && (
				<div className='rounded-lg bg-dark-bg/5 p-2'>
					<h2 className='mb-2 text-sm italic'>Food & Drink</h2>
					<div className='grid grid-cols-5 gap-2'>
						{hasAlcohol && <Feature label='Alcohol' Icon={IoBeer} />}
						{meals.breakfast && (
							<Feature label='Breakfast' Icon={MdFreeBreakfast} />
						)}
						{meals.brunch && <Feature label='Brunch' Icon={MdBrunchDining} />}
						{meals.lunch && <Feature label='Lunch' Icon={MdLunchDining} />}
						{meals.dessert && <Feature label='Dessert' Icon={MdIcecream} />}
						{meals.dinner && <Feature label='Dinner' Icon={MdDinnerDining} />}
					</div>
				</div>
			)}
			<div className='rounded-lg bg-dark-bg/5 p-2'>
				<h2 className='mb-2 text-sm italic'>Amenities</h2>
				<div className='grid grid-cols-5 gap-2'>
					{amenities.restroom && (
						<Feature label='Rest room' Icon={FaRestroom} />
					)}
					{amenities.smoking && (
						<Feature label='Smoking' Icon={MdSmokingRooms} />
					)}
					{amenities.jukebox && <Feature label='Jukebox' Icon={RiDiscFill} />}
					{amenities.music && <Feature label='Music' Icon={MdMusicNote} />}
					{amenities.live_music && (
						<Feature label='Live music' Icon={FaGuitar} />
					)}
					{amenities.private_room && (
						<Feature label='Private room' Icon={MdMeetingRoom} />
					)}
					{amenities.outdoor_seating && (
						<Feature label='Outdoor' Icon={MdOutdoorGrill} />
					)}
					{amenities.tvs && <Feature label='TV' Icon={MdTv} />}
					{amenities.atm && <Feature label='ATM' Icon={MdOutlineAtm} />}
					{amenities.coat_check && (
						<Feature label='Coat check' Icon={GiSecurityGate} />
					)}
					{amenities.wheelchair_accessible && (
						<Feature label='Wheelchair accessible' Icon={FaWheelchair} />
					)}
					{amenities.parking && (
						<Feature label='Parking area' Icon={MdLocalParking} />
					)}
				</div>
			</div>
		</>
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
