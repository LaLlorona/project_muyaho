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
					<input type="file" @change="previewImage" accept="image/*" />
					<v-text-field
						name="name"
						label="your meme's name"
						type="text"
						v-model="name"
						required
					></v-text-field>

					<v-textarea
						name="explanation"
						label="explanation"
						type="test"
						v-model="explanation"
						required
					></v-textarea>
					<v-btn type="submit" color="orange" dark>post</v-btn>

					<p v-if="isLoading">
						Progress: {{ uploadValue.toFixed() + '%' }}
						<progress id="progress" :value="uploadValue" max="100"></progress>
					</p>
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
import firebase from 'firebase';
export default {
	data() {
		return {
			name: '',
			uploadValue: 0,

			explanation: '',
			image: null,
		};
	},
	computed: {
		isLoading() {
			return this.$store.state.isLoading;
		},
	},
	methods: {
		previewImage(event) {
			console.log(event);
			this.image = event.target.files[0];
		},
		async fnDoPost() {
			this.$store.commit('setLoadingValue', true);
			const storageRef = firebase
				.storage()
				.ref(`${this.image.name}`)
				.put(this.image);
			storageRef.on(
				`state_changed`,
				snapshot => {
					this.uploadValue =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				error => {
					console.log(error.message);
				},
				() => {
					this.uploadValue = 100;
					storageRef.snapshot.ref.getDownloadURL().then(url => {
						let data = {
							name: this.name,
							thumbnail: url,
							explanation: this.explanation,
						};
						this.$store.dispatch('postMeme', data);
					});
				},
			);
		},
	},
};
</script>

<style></style>
