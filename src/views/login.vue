<template>
	<v-container flow id="inspire">
		<v-row align="center" justify="center">
			<v-col cols="8" class="text-center my-5">
				<h1 class="display-1" style="color:#EF476F">로그인 페이지</h1>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="2" md="3">
				<v-img src="../assets/5.gif"></v-img>
			</v-col>
			<v-col class="text-center" cols="8" md="6">
				<form @submit.prevent="fnDoLogin">
					<v-text-field
						name="Email"
						label="이메일"
						type="email"
						v-model="email"
						required
					></v-text-field>
					<v-text-field
						name="Password"
						label="비밀번호"
						type="password"
						v-model="password"
						required
					></v-text-field>
					<v-btn type="submit" color="orange" dark>로그인</v-btn>
					<v-alert class="mt-3" type="error" dismissible v-model="alert">{{
						getErrorMessage
					}}</v-alert>
				</form>
			</v-col>
		</v-row>
		<br />
		<div>
			<p class="text-center">
				<router-link to="/signup">계정이 없으세요?</router-link>
			</p>
		</div>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			alert: false,
		};
	},

	computed: {
		getErrorMessage() {
			return this.$store.state.errorMessage;
		},
		getRandomImage() {
			let index = Math.floor(Math.random() * 10);
			return `${index}.gif`;

			// return '../assets/1.jpg';
		},
	},
	methods: {
		fnDoLogin() {
			this.$store.dispatch('login', {
				email: this.email,
				password: this.password,
			});
		},
	},
	watch: {
		getErrorMessage(pMsg) {
			if (pMsg) this.alert = true;
		},
		alert(pValue) {
			if (pValue == false) {
				this.$store.commit('setErrorMessage', '');
			}
		},
	},
};
</script>

<style scoped>
.v-parallax__image {
	transform: none !important;
	width: 100% !important;
}
</style>
