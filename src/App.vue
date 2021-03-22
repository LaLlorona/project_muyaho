<template>
	<v-app>
		<v-navigation-drawer app temporary v-model="drawer">
			<v-toolbar flat height="70px">
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<img src="./assets/doge_face.jpg" />
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="title">
								{{ getUserName }}
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-btn
									text
									@click.stop="logout"
									v-if="isLogin"
									color="secondary"
								>
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
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-toolbar>
			<v-divider></v-divider>
			<v-list class="pt-3">
				<v-list-item>
					<v-btn text color="secondary" @click.stop="movePageTo('/fame')">
						<v-icon left>mdi-trophy</v-icon>명예의 전당
					</v-btn>
				</v-list-item>
				<v-list-item>
					<v-btn text @click.stop="goToPost" color="secondary">
						<v-icon left>mdi-file-document-edit-outline</v-icon>포스트
					</v-btn>
				</v-list-item>
				<v-list-item>
					<v-btn
						text
						@click.stop="movePageTo('/explanation')"
						color="secondary"
					>
						<v-icon left>mdi-help-circle-outline</v-icon>소개
					</v-btn>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar app color="primary" dark>
			<v-app-bar-nav-icon
				@click.stop="drawer = !drawer"
				class="hidden-md-and-up"
			></v-app-bar-nav-icon>

			<v-btn text color="secondary" @click.stop="movePageTo('/main')"
				>MUYAHO</v-btn
			>

			<v-spacer></v-spacer>

			<v-btn
				v-if="this.$route.name == 'main'"
				color="secondary"
				text
				@click.stop="search"
			>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-text-field
				v-if="this.$route.name == 'main'"
				class="shrink"
				color="secondary"
				v-model="searchWord"
				@keyup.enter="search"
			></v-text-field>

			<v-btn
				text
				color="secondary"
				@click.stop="movePageTo('/fame')"
				class="hidden-sm-and-down"
			>
				<v-icon left>mdi-trophy</v-icon>명예의 전당
			</v-btn>

			<v-btn
				text
				@click.stop="goToPost"
				color="secondary"
				class="hidden-sm-and-down"
			>
				<v-icon left>mdi-file-document-edit-outline</v-icon>포스트
			</v-btn>

			<v-btn
				text
				@click.stop="movePageTo('/explanation')"
				color="secondary"
				class="hidden-sm-and-down"
			>
				<v-icon left>mdi-help-circle-outline</v-icon>소개
			</v-btn>

			<v-btn
				text
				@click.stop="logout"
				v-if="isLogin"
				color="secondary"
				class="hidden-sm-and-down"
			>
				<v-icon left>mdi-logout</v-icon>로그아웃</v-btn
			>
			<v-btn
				text
				@click.stop="login"
				v-if="!isLogin && isThisNotLoginPage"
				color="secondary"
				class="hidden-sm-and-down"
			>
				<v-icon left>mdi-login</v-icon>
				로그인
			</v-btn>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
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
			drawer: false,
		};
	},
	computed: {
		isThisNotLoginPage() {
			return this.$route.name != 'login';
		},
		getUserName() {
			if (this.isLogin) {
				return this.$store.state.userProfile.name;
			} else {
				return '로그인을 해주세요';
			}
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
