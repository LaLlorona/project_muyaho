<template>
	<v-app-bar app color="primary" dark>
		<v-row>
			<v-col cols="2"></v-col>
			<v-col cols="2">MUYAHO </v-col>
			<v-col cols="2">2 </v-col>
			<v-col cols="2">34 </v-col>
			<v-col cols="2">
				<v-btn @click.stop="goToPost"> Post</v-btn>
			</v-col>
			<v-col cols="2">
				<div v-if="isLogin">
					<v-btn @click.stop="logout" v-if="isLogin"> logout</v-btn>
				</div>

				<v-btn @click.stop="login" v-if="!isLogin && isThisNotLoginPage"
					>login</v-btn
				>
			</v-col>
		</v-row>
	</v-app-bar>
</template>

<script>
import Mixin from '@/mixins/Mixin.js';
export default {
	mixins: [Mixin],
	computed: {
		isThisNotLoginPage() {
			return this.$route.name != 'login';
		},
	},
	methods: {
		async logout() {
			await this.$store.dispatch('logout');
			// console.log(this.$store.state.userProfile);
			// console.log(this.computed.isLogin());
		},
		goToPost() {
			this.$router.push('/post');
		},

		login() {
			this.$router.push('/login');
		},
	},
};
</script>

<style></style>
