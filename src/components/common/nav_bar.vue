<template>
	<v-app-bar app color="primary" dark>
		<v-toolbar-title>
			<v-btn text color="secondary" @click.stop="movePageTo('/main')"
				>MUYAHO</v-btn
			>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn text @click.stop="search">
			<v-icon>mdi-magnify</v-icon>
		</v-btn>

		<v-text-field
			class="shrink"
			v-model="searchWord"
			@keyup.enter="search"
		></v-text-field>

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
	</v-app-bar>
</template>

<script>
import Mixin from '@/mixins/Mixin.js';
import bus from '@/utils/bus.js';
import algoliasearch from 'algoliasearch/lite';

export default {
	mixins: [Mixin],
	data() {
		return {
			searchWord: '',
			searchClient: algoliasearch(
				'X3LM926NK1',
				'9435c0f6dfcce9c3bec66562a2646d06',
			),
		};
	},
	computed: {
		isThisNotLoginPage() {
			return this.$route.name != 'login';
		},
	},
	methods: {
		async logout() {
			await this.$store.dispatch('logout');
		},
		goToPost() {
			this.$router.push('/post');
		},

		login() {
			this.$router.push('/login');
		},
		search() {
			console.log('search event from nav_bar sent');
			bus.$emit('start:search', this.searchWord);
			this.searchWord = '';
		},

		test() {
			console.log('testing');
		},
	},
};
</script>

<style></style>
