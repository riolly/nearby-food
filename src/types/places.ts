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
	chains: any[]
	distance: number
	geocodes: Geocodes
	link: string
	location: Location
	name: string
	related_places: RelatedPlaces
	timezone?: string
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
	roof: Center
}

export type Location = {
	address: string
	census_block: string
	country: Country
	cross_street?: string
	dma: Dma
	formatted_address: string
	locality: Locality
	postcode: string
	region: Region
	address_extended?: string
}

export enum Country {
	Us = 'US',
}

export enum Dma {
	WashingtonDcHagrstwn = 'Washington, Dc-Hagrstwn',
}

export enum Locality {
	Ashburn = 'Ashburn',
	Leesburg = 'Leesburg',
}

export enum Region {
	Va = 'VA',
}

export type RelatedPlaces = unknown
