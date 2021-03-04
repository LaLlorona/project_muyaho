/* eslint-disable no-undef */
import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
require('firebase/auth');

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/main',
		},
		{
			path: '/main',
			name: 'main_page',
			component: () => import('@/views/gallery'),
		},
		{
			path: '/login',
			name: 'login_page',
			component: () => import('@/views/login'),
		},
		{
			path: '/signup',
			name: 'signup_page',
			component: () => import('@/views/signup'),
		},
		{
			path: '/upload',
			name: 'upload_page',
			component: () => import('@/views/upload'),
			meta: {
				bAuth: true,
			},
		},
		{
			path: '/evaluate',
			name: 'evaluate_page',
			component: () => import('@/views/evaluate'),
			meta: {
				bAuth: true,
			},
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
