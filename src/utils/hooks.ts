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

export const usePlaces = () =>
	useQuery<Place[], Error>({
		queryKey: ['places'],
		queryFn: async () =>
			fetch(
				'https://api.foursquare.com/v3/places/search?radius=1000&categories=13000',
				reqOpts
			)
				.then(async (response) => response.json())
				.then((data) => data.results as Place[]),
	})
