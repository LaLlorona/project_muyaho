import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './routes/index.js';
import store from './store/index.js';
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
			//it returns user, not crudential
			if (pUserInfo != null) {
				store.dispatch('fnDoLoginAuto', pUserInfo);
			}
		});
	},
	render: h => h(App),
}).$mount('#app');
