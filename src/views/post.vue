<template>
	<v-container>
		<v-row>
			<v-col offset-md="3" md="6" offset="1" cols="10">
				<v-card class="mx-4 my-12">
					<form @submit.prevent="fnDoPost">
						<v-img
							class="percent-size"
							src="../assets/placeholder.png"
							v-if="imageUrl == ''"
						></v-img>
						<v-img class="percent-size" :src="imageUrl" v-else></v-img>

						<v-card-text>
							<input
								type="file"
								@change="previewImage"
								accept="image/*"
								required
							/>
						</v-card-text>

						<v-card-title>
							<v-text-field
								name="name"
								label="name"
								type="text"
								v-model="name"
								:rules="[
									v =>
										(v || '').length < 100 || `제목은 100자 미만이어야 합니다.`,
								]"
								maxLength="100"
								required
							></v-text-field>
						</v-card-title>

						<v-card-text>
							<v-textarea
								name="explanation"
								label="explanation"
								type="test"
								v-model="explanation"
								:rules="[
									v =>
										(v || '').length < 300 || '설명은 300자 미만이어야 합니다.',
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
							>
							</v-select>
							<v-alert type="error" dismissible v-model="alert">{{
								errorMessage
							}}</v-alert>

							<p v-if="isLoading">
								Progress: {{ uploadValue.toFixed() + '%' }}
								<progress
									id="progress"
									:value="uploadValue"
									max="100"
								></progress>
							</p>
						</v-card-text>

						<v-card-title>
							<v-btn type="submit" color="orange" dark>post</v-btn>
						</v-card-title>
					</form>
				</v-card>
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
			imageUrl: '',
			year: 0,
			errorMessage: '',
			alert: false,
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
			this.imageUrl = URL.createObjectURL(this.image);
		},
		assertInput() {
			if (this.year == 0) {
				return false;
			}
			return true;
		},
		async fnDoPost() {
			if (this.assertInput()) {
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
								year: this.year,
							};
							this.$store.dispatch('postMeme', data);
						});
					},
				);
			} else {
				this.errorMessage = '모든 빈칸을 완성시켜주세요.';
				this.alert = true;
				setTimeout(() => {
					this.errorMessage = '';
					this.alert = false;
				}, 2000);
			}
		},
	},
};
</script>

<style scoped>
.percent-size {
	max-width: 100%;
	max-height: 35vh;
	margin: auto;
}
</style>
