import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker_notusing';
import router from './routes/index.js';
import store from './store/index.js';
import vuetify from './plugins/vuetify';
import InstantSearch from 'vue-instantsearch';
import { auth } from '@/datasources/firebase.js';
Vue.use(InstantSearch);
Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(user => {
	if (!app) {
		app = new Vue({
			router,
			store,
			vuetify,

			render: h => h(App),
		}).$mount('#app');
	}
	if (user) {
		store.dispatch('fetchUserProfile', user);
	}
});
