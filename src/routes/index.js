import Vue from 'vue';
import Router from 'vue-router';

import { auth } from '@/datasources/firebase.js';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			redirect: '/main',
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
			path: '/post',
			name: 'post',
			component: () => import('@/views/post.vue'),
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '/fame',
			name: 'fame',
			component: () => import('@/views/hall_of_fame.vue'),
		},
		{
			path: '/test',
			name: 'test',
			component: () => import('@/views/test.vue'),
		},

		{
			path: '/profile',
			name: 'profile',
			component: () => import('@/views/profile.vue'),
		},
		{
			path: '/explanation',
			name: 'explanation',
			component: () => import('@/views/explanation.vue'),
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
	console.log(auth.currentUser);

	if (requiresAuth && !auth.currentUser) {
		next('/Login');
	} else {
		next();
	}
});

export default router;
