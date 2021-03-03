<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
			<v-toolbar-title>multi pages</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn>asdfasdf </v-btn>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>
		<v-content>
			<router-view></router-view>
		</v-content>

		<v-footer color="secondary" fixed dark>
			<div class="mx-auto">CODE-DESIGN.web.app</div>
		</v-footer>
	</v-app>
</template>
