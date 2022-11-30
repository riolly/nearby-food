import {useQuery, type UseQueryOptions} from '@tanstack/react-query'
import {defaultCategoryId, defaultRadius} from 'utils/constant'
import {type Place} from 'types/places'

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
	'name',
	'location',
	'distance',
	'categories',
	'geocodes',
	'price',
	'rating',
	'tastes',
	'photos',
	'stats',
	'verified',
	'popularity',
]
const fieldsUri = encodeURIComponent(fields.join(','))

export const useSearchPlaces = (
	query: string | number,
	opts: UseQueryOptions<Place[], Error> | void
) => {
	const category = typeof query === 'number' ? query : defaultCategoryId
	const queryEncode =
		typeof query === 'string' ? `&query=${encodeURIComponent(query)}` : ''

	return useQuery<Place[], Error>({
		queryKey: ['places', query],
		queryFn: async () =>
			fetch(
				`https://api.foursquare.com/v3/places/search?radius=${defaultRadius}&categories=${category}&fields=${fieldsUri}${queryEncode}`,
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data.results as Place[]),
		...opts,
	})
}
