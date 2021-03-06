import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import * as fb from '@/datasources/firebase.js';
import router from '@/routes/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		new VuexPersistence({
			storage: window.localStorage,
		}).plugin,
	],
	state: {
		userProfile: {},
		isLoading: false,
	},

	actions: {
		async login({ dispatch }, form) {
			// sign user in
			const { user } = await fb.auth.signInWithEmailAndPassword(
				form.email,
				form.password,
			);

			// fetch user profile and set in state
			dispatch('fetchUserProfile', user);
		},

		async logout({ commit }) {
			await fb.auth.signOut();

			// clear userProfile and redirect to /login
			commit('setUserProfile', {});
		},

		async signup({ dispatch }, form) {
			// sign user up
			const { user } = await fb.auth.createUserWithEmailAndPassword(
				form.email,
				form.password,
			);

			// create user profile object in userCollections
			await fb.usersCollection.doc(user.uid).set({
				name: form.name,
			});

			// fetch user profile and set in state
			dispatch('fetchUserProfile', user);
		},

		async fetchUserProfile({ commit }, user) {
			// fetch user profile
			const userProfile = await fb.usersCollection.doc(user.uid).get();

			// set user profile in state
			commit('setUserProfile', userProfile.data());

			// change route to dashboard
			router.push('/');
		},

		async postMeme(context, data) {
			fb.postsCollection
				.add({
					createOn: new Date(),
					name: data.name,
					thumbnail: data.thumbnail,
					explanation: data.explanation,
					userId: fb.auth.currentUser.uid,
					userName: this.state.userProfile.name,
					comments: 0,
					likes: 0,
				})
				.then(response => {
					console.log(response);
					context.commit('setLoadingValue', false);
					router.push('/main');
				});
		},

		async fetchAllMemes() {
			let memesOnPostsCollections = [];
			await fb.postsCollection.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
					let dataWithId = doc.data();
					dataWithId.id = doc.id;
					memesOnPostsCollections.push(dataWithId);
				});
			});

			return memesOnPostsCollections;
		},
	},

	mutations: {
		setUserProfile(state, data) {
			state.userProfile = data;
		},
		setLoadingValue(state, data) {
			state.isLoading = data;
		},
	},
});
