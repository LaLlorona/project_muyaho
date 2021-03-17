import card_with_dialog from '@/components/common/card_with_dialog';
import algoliasearch from 'algoliasearch/lite';
import * as secret from '../../secret';

import * as fb from '@/datasources/firebase.js';
import router from '@/routes/index.js';

export default {
	data() {
		return {
			isSearching: false,
			memes: [],
			isLoading: false,
			lastVisible: null,
		};
	},

	components: {
		card_with_dialog,
	},

	computed: {
		getMemes() {
			return this.$store.state.currentMemes;
		},
		getNum() {
			if (this.lastVisible == null) {
				return 987654321;
			} else {
				return this.lastVisible;
			}
		},
	},
	methods: {
		async searchOnAlgolia(searchWord) {
			console.log(`accepted from main.vue and parameter is ${searchWord}`);

			let client = algoliasearch(secret.ALGOLIA_USER, secret.ALGOLIA_KEY);
			let index = client.initIndex('firebase_query');
			index.search(searchWord).then(response => {
				let hitId = [];
				let responseLength = Math.min(response.hits.length, 10);
				for (let i = 0; i < responseLength; i++) {
					hitId.push(response.hits[i].postId);
				}
				let updatedMemes = [];

				fb.postsCollection
					.where('postId', 'in', hitId)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							console.log(doc.data());
							updatedMemes.push(doc.data());
						});
						this.memes = updatedMemes;
					});
			});
		},

		async likeMeme(post) {
			if (!fb.auth.currentUser) {
				router.push('/login');
				return;
			}
			const userId = fb.auth.currentUser.uid;
			const postId = post.postId;
			let userProfile = this.$store.state.userProfile;

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

					this.updateLikeInfo(updateInfo);
				} catch (error) {
					console.log(error);
				}
			}
		},

		async unlikeMeme(post) {
			const userId = fb.auth.currentUser.uid;
			const postId = post.postId;
			let currentLikedMemes = this.$store.state.userProfile.likedMemes;
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
					this.updateLikeInfo(updateInfo);
				}
			} catch (error) {
				console.log(error);
			}
		},

		updateLikeInfo(updateInfo) {
			for (let i = 0; i < this.memes.length; i++) {
				if (this.memes[i].postId == updateInfo.postId) {
					if (updateInfo.choice == 'increase') {
						this.memes[i].likes++;
					} else {
						this.memes[i].likes--;
					}
				}
			}
		},
	},
};
