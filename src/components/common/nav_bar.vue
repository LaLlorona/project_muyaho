<template>
	<v-app-bar app color="primary" dark>
		<v-toolbar-title>MUYAHO</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-icon>mdi-magnify</v-icon>

		<v-text-field class="shrink"></v-text-field>

		<v-btn text @click.stop="logout" v-if="isLogin" color="secondary">
			<v-icon left>mdi-logout</v-icon>로그아웃</v-btn
		>
		<v-btn
			text
			@click.stop="login"
			v-if="!isLogin && isThisNotLoginPage"
			color="secondary"
		>
			<v-icon left>mdi-login</v-icon>
			로그인
		</v-btn>
		<v-btn text @click.stop="goToPost" color="secondary">
			<v-icon left>mdi-file-document-edit-outline</v-icon>포스트
		</v-btn>

		<!-- <v-col cols="1">
				<v-btn @click.stop="goToPost"> Post</v-btn>
			</v-col>
			<v-col cols="1">
				<div v-if="isLogin">
					<v-btn @click.stop="logout" v-if="isLogin"> logout</v-btn>
				</div>

				<v-btn @click.stop="login" v-if="!isLogin && isThisNotLoginPage"
					>login</v-btn
				>
			</v-col> -->
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
