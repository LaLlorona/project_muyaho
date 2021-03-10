<template>
	<v-container flow>
		<v-row>
			<v-col cols="12" class="text-center my-5">
				<h1 class="display-1">login page</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
				<form @submit.prevent="fnDoLogin">
					<v-text-field
						name="Email"
						label="email!!!"
						type="email"
						v-model="email"
						required
					></v-text-field>
					<v-text-field
						name="Password"
						label="password!!!"
						type="password"
						v-model="password"
						required
					></v-text-field>
					<v-btn type="submit" color="orange" dark>login</v-btn>
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
