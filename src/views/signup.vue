<template>
	<v-container flow>
		<v-row>
			<v-col cols="12" class="text-center my-5">
				<h1 class="display-1" style="color:#EF476F">MUYAHO 아이디 생성</h1>
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
						:rules="passwordRules"
					></v-text-field>

					<v-text-field
						name="ConfirmPassword"
						label="비밀번호 확인"
						type="password"
						v-model="confirmPassword"
						:rules="confirmPasswordRules"
						required
					>
					</v-text-field>
					<v-btn type="submit" color="orange" dark>가입하기</v-btn>
					<v-alert type="error" dismissible v-model="alert">{{
						getErrorMessage
					}}</v-alert>
				</form>
			</v-col>
			<v-col cols="2" md="3">
				<v-img src="../assets/6.gif"></v-img>
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
			passwordRules: [
				value => !!value || '비밀번호를 입력해주세요',
				value =>
					(value && value.length >= 6) ||
					'비밀번호는 최소 6글자 이상으로 해주세요',
			],
			confirmPasswordRules: [
				value => !!value || '확인비밀번호를 입력해주세요',
				value => value === this.password || '비밀번호가 일치하지 않습니다',
			],
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
