import store from '@/store/index.js';
import moment from 'moment';
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
};
