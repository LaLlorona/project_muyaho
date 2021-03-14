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
		currentMemes: [],
		errorMessage: '',
		isLoading: false,
	},

	actions: {
		async login({ dispatch, commit }, form) {
			// sign user in
			try {
				const { user } = await fb.auth.signInWithEmailAndPassword(
					form.email,
					form.password,
				);

				// fetch user profile and set in state
				dispatch('fetchUserProfile', user);
			} catch (error) {
				commit('setErrorMessage', error.message);
			}
		},

		async logout({ commit }) {
			await fb.auth.signOut();

			// clear userProfile and redirect to /login
			commit('setUserProfile', {});
		},

		async signup({ dispatch, commit }, form) {
			// sign user up
			try {
				const { user } = await fb.auth.createUserWithEmailAndPassword(
					form.email,
					form.password,
				);

				// create user profile object in userCollections
				await fb.usersCollection.doc(user.uid).set({
					name: form.name,
					likedMemes: [],
				});

				// fetch user profile and set in state
				dispatch('fetchUserProfile', user);
			} catch (error) {
				commit('setErrorMessage', error.message);
			}
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
			let postId = 'id' + new Date().getTime();

			fb.postsCollection
				.doc(postId)
				.set({
					createOn: new Date(),
					name: data.name,
					thumbnail: data.thumbnail,
					explanation: data.explanation,
					userId: fb.auth.currentUser.uid,
					userName: this.state.userProfile.name,
					comments: 0,
					likes: 0,
					postId: postId,
				})
				.then(response => {
					console.log(response);
					context.commit('setLoadingValue', false);
					router.push('/main');
				});
		},

		async fetchAllMemes(context) {
			let memesOnPostsCollections = [];
			await fb.postsCollection.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					// doc.data() is never undefined for query doc snapshots

					let dataWithId = doc.data();
					dataWithId.postId = doc.id;
					memesOnPostsCollections.push(dataWithId);
				});
			});
			context.commit('setCurrentMemes', memesOnPostsCollections);

			return memesOnPostsCollections;
		},

		async likeMeme(context, post) {
			if (!fb.auth.currentUser) {
				router.push('/login');
				return;
			}
			const userId = fb.auth.currentUser.uid;

			const postId = post.postId;

			let userProfile = context.state.userProfile;

			if (userProfile.likedMemes.includes(postId)) {
				return;
			} else {
				try {
					await fb.postsCollection.doc(postId).update({
						likes: post.numLikes + 1,
					});
					let toUpdate = userProfile.likedMemes;

					toUpdate.push(postId);
					await fb.usersCollection.doc(userId).update({
						likedMemes: toUpdate,
					});
					const updateInfo = {
						postId: postId,
						choice: 'increase',
					};
					context.commit('updateLikeInfo', updateInfo);
				} catch (error) {
					console.log(error);
				}
			}
		},

		async unlikeMeme(context, post) {
			const userId = fb.auth.currentUser.uid;
			const postId = post.postId;
			let currentLikedMemes = context.state.userProfile.likedMemes;
			try {
				await fb.postsCollection.doc(postId).update({
					likes: post.numLikes - 1,
				});
				let index = currentLikedMemes.indexOf(postId);

				if (index > -1) {
					currentLikedMemes.splice(index, 1);

					await fb.usersCollection.doc(userId).update({
						likedMemes: currentLikedMemes,
					});
					const updateInfo = {
						postId: postId,
						choice: 'decrease',
					};
					context.commit('updateLikeInfo', updateInfo);
				}
			} catch (error) {
				console.log(error);
			}
		},
	},

	mutations: {
		setUserProfile(state, data) {
			state.userProfile = data;
		},
		setLoadingValue(state, data) {
			state.isLoading = data;
		},
		setCurrentMemes(state, data) {
			state.currentMemes = data;
		},
		setErrorMessage(state, data) {
			state.errorMessage = data;
		},
		updateLikeInfo(state, updateInfo) {
			for (let i = 0; i < state.currentMemes.length; i++) {
				if (state.currentMemes[i].postId == updateInfo.postId) {
					if (updateInfo.choice == 'increase') {
						state.currentMemes[i].likes++;
					} else {
						state.currentMemes[i].likes--;
					}
				}
			}
		},
	},
});
