<template>
	<v-container>
		<div class="main-font main-size text-center">
			{{ this.year }}년 최고의 밈
		</div>

		<v-select
			v-model="year"
			:items="allYears"
			:rules="[v => !!v || '연도를 선택해주세요.']"
			item-text="state"
			item-value="abbr"
			label="밈 등장 시기"
			persistent-hint
			return-object
			single-line
			@input="resetLastVisibleAndGetYearMeme()"
		>
		</v-select>
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
		</v-row>
		<v-progress-linear
			v-if="isLoading"
			color="primary"
			indeterminate
			rounded
			height="6"
		></v-progress-linear>
		<p v-if="!isLoading && !this.memes.length">
			사진이 없습니다. 너무 허전해요...
		</p>
	</v-container>
</template>

<script>
import searchMixin from '@/mixins/searchMixin.js';
import * as fb from '@/datasources/firebase.js';

export default {
	mixins: [searchMixin],
	data() {
		return {
			isSearching: false,
			memes: [],
			isLoading: false,
			lastVisible: null,
			year: 0,
		};
	},
	created() {
		console.log('hall of fame created');
		this.year = this.getThisYear();
		this.resetLastVisibleAndGetYearMeme();
	},
	computed: {
		allYears() {
			const year = new Date().getFullYear();
			return Array.from(
				{ length: year - 2000 },
				(value, index) => year - index,
			);
		},
	},

	methods: {
		getThisYear() {
			return new Date().getFullYear();
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
					this.fetchMemesWithSpecificNumberFromYear(8);
				}
			};
		},

		resetLastVisibleAndGetYearMeme() {
			this.lastVisible = null;
			this.memes = [];
			this.fetchMemesWithSpecificNumberFromYear(8);
		},

		async fetchMemesWithSpecificNumberFromYear(num) {
			try {
				console.log('fetch called');
				if (typeof this.lastVisible === 'undefined') {
					console.log('stopped since undefined');
					return;
				}
				this.isLoading = true;
				await fb.postsCollection
					.where('year', '==', this.year)
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
	mounted() {
		this.scroll();
	},

	// beforeDestroy() {
	// 	bus.$off('start:search', this.search);
	// },
};
</script>

<style scoped>
.main-font {
	font-family: 'Kirang Haerang', cursive;
}

.main-size {
	font-size: 6rem;
	font-weight: 300;
	line-height: 6rem;
	letter-spacing: -0.015625em;
}
</style>
