<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="3"
				xl="3"
				v-for="meme in getMemes"
				:key="meme.id"
			>
				<card_with_dialog :item="meme" @update="updateMemes"></card_with_dialog>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import card_with_dialog from '@/components/common/card_with_dialog';
import searchMixin from '@/mixins/searchMixin.js';
import bus from '@/utils/bus';

export default {
	data() {
		return {
			memes: [],
		};
	},
	mixins: [searchMixin],
	components: {
		card_with_dialog,
	},

	computed: {
		getMemes() {
			return this.$store.state.currentMemes;
		},
	},
	methods: {
		updateMemes() {
			this.memes = this.$store.state.currentMemes;
		},
		search(searchWord) {
			this.searchOnAlgolia(searchWord);
		},
	},

	async created() {
		bus.$on('start:search', this.search);
		await this.$store.dispatch('fetchAllMemes');
		this.memes = this.$store.state.currentMemes;
		console.log('process env is');
		// eslint-disable-next-line no-undef
		console.log(process.env.VUE_APP_ALGOLIA_KEY);
	},

	beforeDestroy() {
		bus.$off('start:search', this.search);
	},
};
</script>

<style scoped></style>
