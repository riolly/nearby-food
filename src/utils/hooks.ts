import {useQuery, type UseQueryOptions} from '@tanstack/react-query'
import {defaultCategoryId, defaultRadius} from 'utils/constant'
import {type PlaceDetails, type PlaceList} from 'types/place'

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
		...opts,
	})
}
