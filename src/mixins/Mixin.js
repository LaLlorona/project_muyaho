import store from '@/store/index.js';
import moment from 'moment';
import router from '@/routes/index.js';

import 'instantsearch.css/themes/algolia-min.css';
export default {
	filters: {
		formatDate(val) {
			if (!val) {
				return '-';
			}
			let date = val.toDate();
			return moment(date).fromNow();
		},
	},
	computed: {
		isLogin() {
			return Object.keys(store.state.userProfile).length !== 0;
		},
	},
	methods: {
		movePageTo(to) {
			router.push(to);
		},
	},
};
