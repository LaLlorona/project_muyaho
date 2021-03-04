import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import common from '@/store/common';
import loginLogic from '@/store/login_logic';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		common: common,
		login_logic: loginLogic,
	},
	plugins: [
		new VuexPersistence({
			storage: window.localStorage,
		}).plugin,
	],
});
