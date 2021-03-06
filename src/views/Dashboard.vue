<template>
	<div>
		dashboard
		{{ name }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: '',
		};
	},

	created() {
		this.name = this.$store.state.userProfile;
	},
};
</script>

<style></style>
