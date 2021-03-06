<template>
	<v-container>
		<v-row>
			<v-col cols="2"></v-col>
			<v-col cols="8"><h1>Post your meme</h1></v-col>
			<v-col cols="2"></v-col>
		</v-row>
		<v-row>
			<v-col cols="3">
				<!-- <v-img src="../assets/rainbow_parrot.gif" max-width="300"></v-img> -->
			</v-col>
			<v-col cols="6">
				<form @submit.prevent="fnDoPost">
					<v-text-field
						name="name"
						label="your meme's name"
						type="text"
						v-model="name"
						required
					></v-text-field>
					<v-text-field
						name="thunbnail"
						label="thumbnail"
						type="text"
						v-model="thumbnail"
						required
					></v-text-field>
					<v-text-field
						name="explanation"
						label="explanation"
						type="test"
						v-model="explanation"
						required
					></v-text-field>
					<v-btn type="submit" color="orange" dark>post</v-btn>
				</form>
			</v-col>
			<v-col cols="3">
				<!-- <v-img
					src="../assets/rainbow_parrot_sunglasses.gif"
					max-width="300"
				></v-img> -->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			thumbnail: '',
			explanation: '',
		};
	},
	methods: {
		async fnDoPost() {
			const data = {
				name: this.name,
				thumbnail: this.thumbnail,
				explanation: this.explanation,
			};
			let response = await this.$store.dispatch('postMeme', data);
			console.log(response);
		},
	},
};
</script>

<style></style>
