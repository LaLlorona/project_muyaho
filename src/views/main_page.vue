<template>
	<v-container>
		<v-row>
			<v-col xs="12" class="mt-5 text-center">
				<h1 class="display-1 my-1">page after login</h1>
				<p class="body-1">authentification complete</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col dark offset="1" cols="10" class="mt-5 text-center">
				<img
					v-if="fnGetUser.photoURL"
					:src="fnGetUser.photoURL"
					class="avatar_style"
					alt
				/>
				<h3 class="pt-2 mt-4 grey lighten-2">{{ fnGetUser.name }}</h3>
				<p class="pb-2 grey lighten-2">{{ fnGetUser.email }}</p>
			</v-col>
			<v-col offset="3" cols="6" class="text-center mt-1">
				<v-btn @click="fnSendPasswordReset" block color="orange" large dark>
					<v-icon left>mdi-email</v-icon>reset password
				</v-btn>
			</v-col>
			<v-col dark offset="1" cols="10">
				<v-alert type="success" dismissible v-model="bSuccess"
					>Reset mail was sent to your account!</v-alert
				>
				<v-alert type="error" dismissible v-model="bError">{{
					bErrMsg
				}}</v-alert>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { oFirebaseAuth } from '@/datasources/firebase';
export default {
	data() {
		return {
			bSuccess: false,
			bError: false,
			bErrMsg: '',
		};
	},
	computed: {
		fnGetUser() {
			let oUserInfo = this.$store.getters.fnGetUser;
			return oUserInfo;
		},
	},
	methods: {
		fnSendPasswordReset() {
			let that = this;
			oFirebaseAuth
				.sendPasswordResetEmail(this.fnGetUser.email)
				.then(function() {
					console.log('email sent');
					that.bSuccess = true;
				})
				.catch(function(err) {
					console.log(err);
					that.bError = true;
					that.bErrMsg = err;
				});
		},
	},
};
</script>

<style>
.avatar_style {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
</style>
