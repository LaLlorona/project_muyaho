import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index.js';
import store from '@/store/index.js';
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app';
import '@/datasources/firebase';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	created() {
		firebase.auth().onAuthStateChanged(pUserInfo => {
			if (pUserInfo) {
				store.dispatch('fnDoLoginAuto', pUserInfo);
			}
		});
	},
	render: function(h) {
		return h(App);
	},
}).$mount('#app');
