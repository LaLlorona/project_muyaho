import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#79B791',
				secondary: '#ABD1B5',
				accent: '#EDF4ED',
				error: '#ffffff',
			},
		},
	},
});
