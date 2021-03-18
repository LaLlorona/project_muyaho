<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="3"
				xl="3"
				v-for="meme in this.memes"
				:key="meme.id"
			>
				<card_with_dialog
					:item="meme"
					@likeMeme="likeMeme"
					@unlikeMeme="unlikeMeme"
				></card_with_dialog>
			</v-col>
			<v-col cols="12" class="mt-5 text center">
				<p v-if="!isLoading && !this.memes.length">
					사진이 없습니다. 너무 허전해요...
				</p>
			</v-col>
		</v-row>
		<v-progress-linear
			v-if="isLoading"
			color="primary"
			indeterminate
			rounded
			height="6"
		></v-progress-linear>
	</v-container>
</template>

<script>
import searchMixin from '@/mixins/searchMixin.js';
import bus from '@/utils/bus';
import * as fb from '@/datasources/firebase.js';
export default {
	data() {
		return {
			isSearching: false,
			memes: [],
			isLoading: false,
			lastVisible: null,
		};
	},
	mixins: [searchMixin],

	methods: {
		async search(searchWord) {
			if (searchWord == '') {
				this.isSearching = false;
				this.lastVisible = null;
				this.memes = [];

				this.fetchMemesWithSpecificNumberFrom(8);
			} else {
				this.isSearching = true;
				this.searchOnAlgolia(searchWord);
			}
		},
		scroll() {
			window.onscroll = () => {
				let bottomOfWindow =
					Math.max(
						window.pageYOffset,
						document.documentElement.scrollTop,
						document.body.scrollTop,
					) +
						window.innerHeight ===
					document.documentElement.offsetHeight;

				if (bottomOfWindow && !this.isLoading && !this.isSearching) {
					console.log('bottom reached and retrieve');
					this.fetchMemesWithSpecificNumberFrom(8);
				}
			};
		},

		async fetchMemesWithSpecificNumberFrom(num) {
			try {
				console.log('fetch called');
				if (typeof this.lastVisible === 'undefined') {
					console.log('stopped since undefined');
					return;
				}
				this.isLoading = true;
				await fb.postsCollection
					// .where('year', '==', 2021)
					.orderBy('likes', 'desc')
					.startAfter(this.getNum)
					.limit(num)
					.get()
					.then(querySnapshot => {
						this.lastVisible =
							querySnapshot.docs[querySnapshot.docs.length - 1];
						console.log(this.lastVisible);
						querySnapshot.forEach(doc => {
							// doc.data() is never undefined for query doc snapshots

							let dataWithId = doc.data();
							dataWithId.postId = doc.id;
							this.memes.push(dataWithId);
						});
					});
				this.isLoading = false;
			} catch (error) {
				console.log(error);
				this.isLoading = false;
			}
		},
	},

	async created() {
		bus.$on('start:search', this.search);

		this.fetchMemesWithSpecificNumberFrom(8);
		console.log('created');
		// await this.$store.dispatch('fetchAllMemes');
		// this.memes = this.$store.state.currentMemes;
	},
	mounted() {
		this.scroll();
	},

	beforeDestroy() {
		console.log('will be destroied');
		bus.$off('start:search', this.search);
	},
};
</script>

<style scoped></style>
