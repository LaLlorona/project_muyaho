import firebase from 'firebase/app';
import 'firebase/firebase-auth';
// import router from '@/routes/index.js';

export default {
	state: {
		oUser: null,
	},

	mutations: {
		fnSetUser(state, payload) {
			state.oUser = payload;
		},
	},

	getters: {
		fngetUser(state) {
			return state.oUser;
		},

		fnGetAuthStatus(state) {
			return state.oUser != null;
		},
	},

	actions: {
		async fnRegisterUser(context, payload) {
			context.commit('fnSetLoading', true);
			let response = await firebase
				.auth()
				.createUserWithEmailAndPassword(payload.pEmail, payload.pPassword);
			console.log(response);
		},
	},
};
