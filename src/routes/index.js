import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';

import { auth } from '@/datasources/firebase.js';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				requiredAuth: true,
			},
		},

		{
			path: '/main',
			name: 'main',
			component: () => import('@/views/main.vue'),
		},

		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login.vue'),
		},

		{
			path: '/signup',
			name: 'signup',
			component: () => import('@/views/signup.vue'),
		},

		{
			path: '/settings',
			name: 'settings',
			component: () => import('@/views/Settings.vue'),
			meta: {
				requiredAuth: true,
			},
		},

		{
			path: '/post',
			name: 'post',
			component: () => import('@/views/post.vue'),
		},

		{
			path: '/*',
			name: 'error_page',
			component: () => import('@/views/error_page.vue'),
		},
	],
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

	if (requiresAuth && !auth.currentUser) {
		next('/Login');
	} else {
		next();
	}
});

export default router;
