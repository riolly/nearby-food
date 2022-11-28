export type PlacesResponse = {
	results: Place[]
	context: Context
}

export type Context = {
	geo_bounds: GeoBounds
}

export type GeoBounds = {
	circle: Circle
}

export type Circle = {
	center: Center
	radius: number
}

export type Center = {
	latitude: number
	longitude: number
}

export type Place = {
	fsq_id: string
	categories: Category[]
	distance: number
	geocodes: Geocodes
	location: Location
	name: string
	photos: Photo[]
	popularity: number
	price?: number
	rating: number
	stats: Stats
	tastes?: string[]
	verified: boolean
}

export type Category = {
	id: number
	name: string
	icon: Icon
}

export type Icon = {
	prefix: string
	suffix: Suffix
}

export enum Suffix {
	PNG = '.png',
}

export type Geocodes = {
	main: Center
	roof?: Center
}

export type Location = {
	address: string
	country: Country
	cross_street: string
	formatted_address: string
	locality: Locality
	neighborhood?: string[]
	postcode?: string
	region: Region
}

export enum Country {
	ID = 'ID',
}

export enum Locality {
	Yogyakarta = 'Yogyakarta',
}

export enum Region {
	DIYogyakarta = 'DI Yogyakarta',
}

export type Photo = {
	id: string
	created_at: Date
	prefix: string
	suffix: string
	width: number
	height: number
	classifications?: Classification[]
}

export enum Classification {
	Food = 'food',
	Outdoor = 'outdoor',
}

export type Stats = {
	total_photos: number
	total_ratings: number
	total_tips: number
}
