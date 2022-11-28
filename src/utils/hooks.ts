import {useQuery} from '@tanstack/react-query'
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

export const usePlaces = () => {
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

	const defaultRadius = 1000 // 1km
	const defaultCategories = 13000 // Food & beverages

	return useQuery<Place[], Error>({
		queryKey: ['places'],
		queryFn: async () =>
			fetch(
				`https://api.foursquare.com/v3/places/search?radius=${defaultRadius}&categories=${defaultCategories}&fields=${fieldsUri}`,
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data.results as Place[]),
	})
}
