import Vue from 'vue';
import Router from 'vue-router';

import firebase from 'firebase/app';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'start_page',
			component: () => import('@/views/start_page.vue'),
		},

		{
			path: '/main',
			name: 'main_page',
			component: () => import('@/views/main_page.vue'),
			meta: { bAuth: true },
		},

		{
			path: '/login',
			name: 'login_page',
			component: () => import('@/views/login_page.vue'),
		},

		{
			path: '/register',
			name: 'register_page',
			component: () => import('@/views/register_page.vue'),
		},

		{
			path: '/*',
			name: 'error_page',
			component: () => import('@/views/error_page.vue'),
		},
	],
});

router.beforeEach((to, from, next) => {
	const bNeedAuth = to.matched.some(record => record.meta.bAuth);
	const bCheckAuth = firebase.auth().currentUser;
	if (bNeedAuth && !bCheckAuth) {
		next('/login');
	} else {
		next();
	}
});

export default router;
