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

		<v-text-field class="shrink" v-model="searchWord"></v-text-field>
		<!-- <ais-instant-search
			:search-client="searchClient"
			index-name="firebase_query"
		>
			<ais-search-box placeholder="Search here…" class="searchbox" />
			<ais-hits>
				<template slot="item" slot-scope="{ item }">
					<h1><ais-highlight :hit="item" attribute="name" /></h1>
					<p><ais-highlight :hit="item" attribute="description" /></p>
				</template>
			</ais-hits>
		</ais-instant-search> -->

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
import bus from '@/utils/bus.js';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';

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
			// console.log(this.$store.state.userProfile);
			// console.log(this.computed.isLogin());
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
		},
	},
};
</script>

<style></style>
