<template>
	<v-app>
		<nav_bar></nav_bar>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import nav_bar from '@/components/common/nav_bar.vue';
export default {
	components: {
		nav_bar,
	},
};
</script>

<style></style>
