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
						name="your name"
						label="your name"
						type="text"
						v-model="name"
						required
					></v-text-field>
					<v-text-field
						name="Email"
						label="email!!!"
						type="email"
						v-model="email"
						required
					></v-text-field>
					<v-text-field
						name="Password"
						label="passwrod@!!"
						type="password"
						v-model="password"
						required
					></v-text-field>

					<v-text-field
						name="ConfirmPassword"
						label="password check"
						type="password"
						v-model="confirmPassword"
						required
						:rules="[fnComparePassword]"
					>
					</v-text-field>
					<v-btn type="submit" color="orange" dark>register</v-btn>
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
		};
	},
	computed: {
		fnComparePassword() {
			if (this.sPassword == this.sConfirmPassword) {
				return true;
			} else {
				return 'password is not same. Please check it again.';
			}
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
};
</script>

<style></style>
