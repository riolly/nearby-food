import {useQuery} from '@tanstack/react-query'
import {type Place} from 'types/places'

const reqOpts = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		authorization: import.meta.env.VITE_FOURSQUARE_KEY,
	},
}

async function request<Tres>(
	url: string,
	config: RequestInit
): Promise<Tres[]> {
	return fetch(url, config)
		.then(async (response) => response.json())
		.then((data) => data.results as Tres[])
}

export const usePlaces = () =>
	useQuery({
		queryKey: ['places'],
		queryFn: async () =>
			request<Place>(
				'https://api.foursquare.com/v3/places/search?radius=1000&categories=13000',
				reqOpts
			),
	})
