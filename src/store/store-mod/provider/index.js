import firebase from 'firebase/app';

import 'firebase/firebase-auth';
import router from '@/routes/index.js';

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
		fnGetUser(state) {
			return state.oUser;
		},

		fnGetAuthStatus(state) {
			return state.oUser != null;
		},
	},

	actions: {
		fnRegisterUser({ commit }, payload) {
			commit('fnSetLoading', true);
			firebase
				.auth()
				.createUserWithEmailAndPassword(payload.pEmail, payload.pPassword)
				.then(pUserInfo => {
					commit('fnSetUser', {
						email: pUserInfo.user.email,
					});
					commit('fnSetLoading', false);
					commit('fnSetErrorMessage', '');
					router.push('/main');
				})
				.catch(err => {
					commit('fnSetErrorMessage', err.message);
					commit('fnSetLoading', false);
				});
		},
		fnDoLogin({ commit }, payload) {
			commit('fnSetLoading', true);
			firebase
				.auth()
				.signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
				.then(pUserInfo => {
					//it returns user crudential, not user
					console.log(pUserInfo.user);
					console.log(pUserInfo.user.email);
					commit('fnSetUser', {
						id: pUserInfo.user.uid,
						name: pUserInfo.user.displayName,
						email: pUserInfo.user.email,
						photoURL: pUserInfo.user.photoURL,
					});
					commit('fnSetLoading', false);
					commit('fnSetErrorMessage', '');
					router.push('/main');
				})
				.catch(err => {
					commit('fnSetErrorMessage', err.message);
					commit('fnSetLoading', false);
				});
		},
		fnDoGoogleLogin_Popup({ commit }) {
			commit('fnSetLoading', true);

			let oProvider = new firebase.auth.GoogleAuthProvider();

			oProvider.addScope('profile');
			oProvider.addScope('email');
			firebase
				.auth()
				.signInWithPopup(oProvider)
				.then(pUserInfo => {
					commit('fnSetUser', {
						id: pUserInfo.user.uid,
						name: pUserInfo.user.displayName,
						email: pUserInfo.user.email,
						photoURL: pUserInfo.user.photoURL,
					});
					commit('fnSetLoading', false);
					commit('fnSetErrorMessage', '');
					router.push('/main');
				})
				.catch(err => {
					commit('fnSetErrorMessage', err.message);
					commit('fnSetLoading', false);
				});
		},
		fnDoLogout({ commit }) {
			firebase.auth().signOut();
			commit('fnSetUser', null);
			router.push('/');
		},
		fnDoLoginAuto({ commit }, pUserInfo) {
			console.log('Auto Login Completed');
			console.log(pUserInfo.email);
			commit('fnSetUser', {
				id: pUserInfo.uid,
				name: pUserInfo.displayName,
				email: pUserInfo.email,
				photoURL: pUserInfo.photoURL,
			});
			commit('fnSetLoading', false);
			commit('fnSetErrorMessage', '');
		},
	},
};
