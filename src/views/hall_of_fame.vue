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
				<card_with_dialog :item="meme"></card_with_dialog>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import card_with_dialog from '@/components/common/card_with_dialog';

export default {
	data() {
		return {};
	},
	components: {
		card_with_dialog,
	},

	computed: {
		getMemes() {
			return this.$store.state.currentMemes;
		},
	},
	methods: {},

	async created() {
		await this.$store.dispatch('fetchAllMemes');
	},
};
</script>

<style scoped></style>
