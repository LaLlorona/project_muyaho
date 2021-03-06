<template>
	<v-container>
		this is where you can see memes
		<v-list v-for="item in this.memes" :key="item.id">
			{{ item.name }} |
			{{ item.explanation }}
		</v-list>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			memes: [],
		};
	},
	async created() {
		this.memes = await this.$store.dispatch('fetchAllMemes');
	},
};
</script>

<style></style>
