<template>
	<v-container>
		<div class="main-font main-size text-center">무야호~</div>

		<div class="sub-size sub-font text-center">
			우리는 역사의 중간 세대이다. 지구를 탐험하기에는 너무 늦게 태어났고,
			우주를 탐험하기에는 너무 일찍 태어났다.
		</div>

		<v-divider class="my-3"></v-divider>

		<div class="mid-size text-center mid-font">
			하지만 끝내주는 밈들을 탐색하기에는 알맞은 때에 태어났다.
		</div>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Kirang+Haerang&display=swap');
.main-font {
	font-family: 'Kirang Haerang', cursive;
}
.mid-font {
	font-family: 'Do Hyeon', sans-serif;
}

.sub-font {
	font-family: 'Nanum Gothic', sans-serif;
}
.main-size {
	font-size: 6rem;
	font-weight: 300;
	line-height: 6rem;
	letter-spacing: -0.015625em;
}

.sub-size {
	font-size: 1.25rem;
	font-weight: normal;
	letter-spacing: 0.009375em;
	line-height: 1.5rem;
}

.mid-size {
	font-size: 2rem;
	font-weight: normal;
	letter-spacing: 0.009375em;
	line-height: 2.25rem;
}
</style>
