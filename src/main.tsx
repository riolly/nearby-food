import React from 'react'
import ReactDOM from 'react-dom/client'

import {RouterProvider, Outlet} from '@tanstack/react-router'
import router from './router'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {staleTime: 60_000, refetchOnWindowFocus: false},
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
