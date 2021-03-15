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
					<input type="file" @change="previewImage" accept="image/*" required />
					<v-text-field
						name="name"
						label="name"
						type="text"
						v-model="name"
						:rules="[
							v => (v || '').length < 100 || `제목은 100자 미만이어야 합니다.`,
						]"
						maxLength="100"
						required
					></v-text-field>

					<v-textarea
						name="explanation"
						label="explanation"
						type="test"
						v-model="explanation"
						:rules="[
							v => (v || '').length < 300 || '설명은 300자 미만이어야 합니다.',
						]"
						maxlength="300"
						required
					></v-textarea>
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
					></v-select>

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
			test: 300,
			explanation: '',
			image: null,
			year: 0,
		};
	},

	computed: {
		isLoading() {
			return this.$store.state.isLoading;
		},
		allYears() {
			const year = new Date().getFullYear();
			return Array.from(
				{ length: year - 2000 },
				(value, index) => year - index,
			);
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
