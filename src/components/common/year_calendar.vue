<template>
	<v-menu
		ref="menu"
		:close-on-content-click="false"
		v-model="menu"
		:nudge-right="40"
		lazy
		transition="scale-transition"
		offset-y
		full-width
		min-width="290px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				slot="activator"
				v-model="date"
				label="Birthday date"
				prepend-icon="event"
				readonly
				v-bind="attrs"
				v-on="on"
			></v-text-field>
		</template>
		<v-date-picker
			ref="picker"
			v-model="date"
			@input="save"
			reactive
			no-title
		></v-date-picker>
	</v-menu>
</template>

<script>
export default {
	data: () => ({
		date: null,
		menu: false,
	}),
	watch: {
		menu(val) {
			val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'));
		},
	},
	methods: {
		save(date) {
			this.$refs.menu.save(date);
			this.$refs.picker.activePicker = 'YEAR';
			this.menu = false;
		},
	},
};
</script>

<style></style>
