import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './routes/index.js';
import store from './store/index.js';
import vuetify from './plugins/vuetify';
import { auth } from '@/datasources/firebase.js';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			vuetify,
			render: h => h(App),
		}).$mount('#app');
	}
});
