<template>
	<v-container flow>
		<v-row>
			<v-col cols="12" class="text-center my-5">
				<h1 class="display-1">register page!</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
				<form @submit.prevent="fnRegisterUser">
					<v-text-field
						name="name"
						label="닉네임"
						type="text"
						v-model="name"
						required
					></v-text-field>
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

					<v-text-field
						name="ConfirmPassword"
						label="비밀번호 확인"
						type="password"
						v-model="confirmPassword"
						required
						:rules="[fnComparePassword]"
					>
					</v-text-field>
					<v-btn type="submit" color="orange" dark>register</v-btn>
					<v-alert type="error" dismissible v-model="alert">{{
						getErrorMessage
					}}</v-alert>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			alert: false,
		};
	},

	computed: {
		fnComparePassword() {
			if (this.password == this.confirmPassword) {
				return true;
			} else {
				return '패스워드가 다릅니다.';
			}
		},
		getErrorMessage() {
			return this.$store.state.errorMessage;
		},
	},
	methods: {
		fnRegisterUser() {
			this.$store.dispatch('signup', {
				name: this.name,
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

<style></style>
