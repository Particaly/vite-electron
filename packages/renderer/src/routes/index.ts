import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		name: 'index',
		path: '/index',
		meta: {
			size: {
				width: 800,
				height: 80,
			},
		},
		component: () => import('@/views/index/index.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
