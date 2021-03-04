<template>
	<v-app>
		<v-navigation-drawer clipped v-model="drawer" app>
			<v-list>
				<v-list-item
					value="true"
					v-for="(item, i) in fnGetMenuItems"
					:to="item.to"
					:key="i"
				>
					<v-list-item-action>
						<v-icon>
							{{ item.icon }}
						</v-icon>
					</v-list-item-action>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>

				<v-list-item @click="fnDoLogout" v-if="fnGetAuthStatus">
					<v-list-item-action>
						<v-icon>
							mdi-arrow-right-bold-box-outline
						</v-icon>
					</v-list-item-action>
					<v-list-item-title>logout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar clipped-left app color="primary" dark>
			<v-app-bar-nav-icon
				@click.stop="drawer = !drawer"
				class="hidden-sm-and-up"
			></v-app-bar-nav-icon>
			<router-link to="/" style="cursor: pointer">
				<v-icon class="hidden-xs-only" large color="teal lighten-4"
					>mdi-home</v-icon
				>
			</router-link>
			<v-toolbar-title class="headline">
				email-google auth login
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-xs-only">
				<v-btn
					text
					v-for="item in fnGetMenuItems"
					:key="item.title"
					:to="item.to"
				>
					<v-icon left>{{ item.icon }}</v-icon>
					{{ item.title }}
				</v-btn>

				<v-btn text @click="fnDoLogout" v-if="fnGetAuthStatus">
					<v-icon left>mdi-arrow-right-bold-box-outline</v-icon>
					logout
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-footer app>
			CODE-DESIGN
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
		};
	},
	computed: {
		fnGetAuthStatus() {
			return this.$store.getters.fnGetAuthStatus;
		},
		fnGetMenuItems() {
			if (!this.fnGetAuthStatus) {
				return [
					{
						title: 'register',
						to: '/register',
						icon: 'mdi-lock-open-outline',
					},
				];
			} else {
				return [
					{
						title: 'main_page',
						to: '/main',
						icon: 'mdi-account',
					},
				];
			}
		},
	},
	methods: {
		fnDoLogout() {
			this.$store.dispatch('fnDoLogout');
		},
	},
	name: 'App',
};
</script>
