import {createRouteConfig, createReactRouter} from '@tanstack/react-router'
import DetailsPage from 'pages/details'

import HomePage from 'pages/home'
import MapPage from 'pages/map'

const rootRoute = createRouteConfig()

const homeRoute = rootRoute.createRoute({
	path: '/',
	component: HomePage,
})
const mapRoute = rootRoute.createRoute({
	path: '/map',
	component: MapPage,
})

const detailsRoute = rootRoute.createRoute({
	path: '/place/$id',
	component: DetailsPage,
})

const routeConfig = rootRoute.addChildren([homeRoute, mapRoute, detailsRoute])
const router = createReactRouter({routeConfig})

export default router

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface RegisterRouter {
		router: typeof router
	}
}
