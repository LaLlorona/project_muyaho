import store from '@/store/index.js';
export default {
	computed: {
		isLogin() {
			return Object.keys(store.state.userProfile).length !== 0;
		},
	},
};
