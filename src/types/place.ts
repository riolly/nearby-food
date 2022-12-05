export const photosSort = ['popular', 'newest'] as const
export type SortTypes = typeof photosSort[number]

export const photosClassifications = [
	'all',
	'food',
	'indoor',
	'menu',
	'outdoor',
] as const
export type ClassificationTypes = typeof photosClassifications[number]

export type PlaceList = {
	fsq_id: string
	categories: Category[]
	distance: number
	geocodes: Geocodes
	location: Location
	name: string
	photos: Photo[]
	popularity: number
	price: number
	rating: number
	stats: Stats
	tastes: string[]
	verified: boolean
}

export type PlaceDetails = PlaceList & {
	description: string
	email: string
	features: Features
	hours: Hours
	hours_popular: HoursPopular[]
	menu: string
	related_places: RelatedPlaces
	social_media: SocialMedia
	tel: string
	tips: Tip[]
	website: string
}

export type PlaceFull = PlaceDetails & {
	census_block_id: string
	chains: Chain[]
	date_closed: Date
	fax: string
	timezone: string
}

export type Category = {
	id: number
	name: string
	icon: Photo
}

export type Photo = {
	id: string
	created_at: Date
	prefix: string
	suffix: string
	width: number
	height: number
	classifications: string[]
	tip: Tip
}

export type Tip = {
	id: string
	created_at: Date
	text: string
	url: string
	lang: string
	agree_count: number
	disagree_count: number
}

export type Chain = {
	id: string
	name: string
}

export type Features = {
	payment: Payment
	food_and_drink: FoodAndDrink
	services: Services
	amenities: Amenities
}

export type Amenities = {
	restroom: boolean
	smoking: boolean
	jukebox: boolean
	music: boolean
	live_music: boolean
	private_room: boolean
	outdoor_seating: boolean
	tvs: boolean
	atm: boolean
	coat_check: boolean
	wheelchair_accessible: boolean
	parking: Parking
}

export type Parking = {
	parking: boolean
	street_parking: boolean
	valet_parking: boolean
	public_lot: boolean
	private_lot: boolean
}

export type FoodAndDrink = {
	alcohol: Alcohol
	meals: Meals
}

export type Alcohol = {
	beer: boolean
	byo: boolean
	cocktails: boolean
	full_bar: boolean
	wine: boolean
}

export type Meals = {
	breakfast: boolean
	brunch: boolean
	lunch: boolean
	happy_hour: boolean
	dessert: boolean
	dinner: boolean
}

export type Payment = {
	credit_cards: CreditCards
	digital_wallet: DigitalWallet
}

export type CreditCards = {
	accepts_credit_cards: boolean
	discover: boolean
	visa: boolean
	diners_club: boolean
	master_card: boolean
}

export type DigitalWallet = {
	accepts_nfc: boolean
}

export type Services = {
	delivery: boolean
	takeout: boolean
	drive_through: boolean
	dine_in: DineIn
}

export type DineIn = {
	reservations: boolean
	online_reservations: boolean
	groups_only_reservations: boolean
}

export type Geocodes = {
	drop_off: DropOff
	front_door: DropOff
	main: DropOff
	road: DropOff
	roof: DropOff
}

export type DropOff = {
	latitude: number
	longitude: number
}

export type Hours = {
	display: string
	is_local_holiday: boolean
	open_now: boolean
	regular: HoursPopular[]
	seasonal: Seasonal[]
}

export type HoursPopular = {
	close: string
	day: number
	open: string
}

export type Seasonal = {
	closed: boolean
	end_date: Date
	hours: HoursPopular[]
	start_date: Date
}

export type Location = {
	address: string
	address_extended: string
	admin_region: string
	country: string
	cross_street: string
	dma: string
	formatted_address: string
	locality: string
	neighborhood: string[]
	po_box: string
	post_town: string
	postcode: string
	region: string
}

export type RelatedPlaces = {
	children: unknown[]
}

export type SocialMedia = {
	facebook_id: string
	instagram: string
	twitter: string
}

export type Stats = {
	total_photos: number
	total_ratings: number
	total_tips: number
}
