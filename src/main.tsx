import React from 'react'
import ReactDOM from 'react-dom/client'

import {RouterProvider, Outlet} from '@tanstack/react-router'
import router from './router'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60 * 24},
	},
})

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}>
				<Outlet />
			</RouterProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
