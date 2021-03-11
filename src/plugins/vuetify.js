import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#FFC43D',
				secondary: '#EF476F',
				third: '#F8FFE5',
				fourth: '06D6A0',
				fifth: '1B9AAA',
				error: '#ff0000',
			},
		},
	},
});
