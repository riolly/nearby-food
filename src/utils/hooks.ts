import {useQuery, type UseQueryOptions} from '@tanstack/react-query'
import {defaultCategoryId, defaultRadius} from 'utils/constant'
import {
	type Photo,
	type Tip,
	type PlaceDetails,
	type PlaceList,
} from 'types/place'

const reqOpts = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		authorization: import.meta.env.VITE_FOURSQUARE_KEY,
	},
}

// Async function request<Tres, E>(
// 	url: string,
// 	config: RequestInit
// ): Promise<Tres[], E> {
// 	return fetch(url, config)
// 		.then(async (response) => response.json())
// 		.then((data) => data.results as Tres[])
// 		.catch((error) => error as E)
// }

const fields = [
	'fsq_id',
	'categories',
	'distance',
	'geocodes',
	'location',
	'name',
	'photos',
	'popularity',
	'price',
	'rating',
	'stats',
	'tastes',
	'verified',
]
const fieldsUri = encodeURIComponent(fields.join(','))

export const useSearchPlaces = (
	query: string | number,
	opts: UseQueryOptions<PlaceList[], Error> | void
) => {
	const category = typeof query === 'number' ? query : defaultCategoryId
	const queryEncode =
		typeof query === 'string' ? `&query=${encodeURIComponent(query)}` : ''

	return useQuery<PlaceList[], Error>({
		queryKey: ['places', query],
		queryFn: async () =>
			fetch(
				`https://api.foursquare.com/v3/places/search?radius=${defaultRadius}&categories=${category}&fields=${fieldsUri}${queryEncode}`,
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data.results as PlaceList[]),
		...opts,
	})
}

const detailFields = [
	...fields,
	'description',
	'email',
	'features',
	'hours',
	'hours_popular',
	'menu',
	'related_places',
	'social_media',
	'tel',
	'tips',
	'website',
]
const detailFieldsUri = encodeURIComponent(detailFields.join(','))

export const usePlaceDetails = (
	id: string,
	opts: UseQueryOptions<PlaceDetails, Error> | void
) =>
	useQuery<PlaceDetails, Error>({
		queryKey: ['place', id],
		queryFn: async () =>
			fetch(
				`https://api.foursquare.com/v3/places/${id}?fields=${detailFieldsUri}`,
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data as PlaceDetails),
		...opts,
	})

export const usePhotos = (
	query: {
		id: string
		sort?: 'POPULAR' | 'NEWEST'
		classifications?: 'food' | 'indoor' | 'menu' | 'outdoor'
	},
	opts: UseQueryOptions<Photo[], Error> | void
) => {
	const {id} = query
	const sort = query.sort ?? 'POPULAR'
	const classifications = query.classifications ?? ''

	return useQuery<Photo[], Error>({
		queryKey: ['photos', id, sort, classifications],
		queryFn: async () =>
			fetch(
				`https://api.foursquare.com/v3/places/${id}/photos?sort=${sort}&classifications=${classifications}`,
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data as Photo[]),
		...opts,
	})
}

const tipFields = [
	'id',
	'created_at',
	'text',
	'url',
	'lang',
	'agree_count',
	'disagree_count',
]
const tipFieldsUri = encodeURIComponent(tipFields.join(','))

export const useTips = (
	id: string,
	opts: UseQueryOptions<Tip[], Error> | void
) =>
	useQuery<Tip[], Error>({
		queryKey: ['tips', id],
		queryFn: async () =>
			fetch(
				`https://api.foursquare.com/v3/places/${id}/tips?fields=${tipFieldsUri}`,
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data as Tip[]),
		...opts,
	})
