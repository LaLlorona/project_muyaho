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
						<v-icon v-html="item.icon"></v-icon>
					</v-list-item-action>
					<v-list-item-title v-text="item.title"></v-list-item-title>
				</v-list-item>

				<v-list-item @click="fnDoLogout" v-if="fnGetAuthStatus">
					<v-list-item-action>
						<v-icon>mdi-arrow-right-bold-box-outline</v-icon>
					</v-list-item-action>
					<v-list-item-title>lotout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar clipped-left app color="primary" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<router-link to="/" style="cursor: pointer">
				<v-icon large color="teal lighten-4"></v-icon>
			</router-link>
			<v-img
				src="./assets/muyaho.jpg"
				class="mx-2"
				max-height="40"
				max-width="40"
				contain
			></v-img>
			<v-toolbar-title class="headline">
				MUYAHO~
			</v-toolbar-title>

			<v-spacer></v-spacer>
		</v-app-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
		<v-footer app>
			<div class="mx-auto">Official MUYAHO supporters</div>
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
						title: 'signup',
						to: '/signup',
						icon: 'mdi-lock-open-outline',
					},
				];
			} else {
				return [
					{
						title: 'main page',
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
};
</script>

<style></style>
