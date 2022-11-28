import {createRouteConfig, createReactRouter} from '@tanstack/react-router'

import HomePage from 'pages/home'

const rootRoute = createRouteConfig()

const indexRoute = rootRoute.createRoute({
	path: '/',
	component: HomePage,
})

const routeConfig = rootRoute.addChildren([indexRoute])
const router = createReactRouter({routeConfig})

export default router

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface RegisterRouter {
		router: typeof router
	}
}
