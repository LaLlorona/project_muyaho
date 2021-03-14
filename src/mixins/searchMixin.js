import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import * as fb from '@/datasources/firebase.js';
import store from '@/store/index.js';
import * as secret from '../../secret';
export default {
	methods: {
		async searchOnAlgolia(searchWord) {
			if (searchWord == '') {
				store.dispatch('fetchAllMemes');
				return;
			}
			console.log(`accepted from main.vue and parameter is ${searchWord}`);
			// await this.$store.dispatch('fetchMemesWithWord', searchWord);

			let client = algoliasearch(secret.ALGOLIA_USER, secret.ALGOLIA_KEY);
			let index = client.initIndex('firebase_query');
			index.search(searchWord).then(response => {
				console.log(response);
				let hitNames = [];
				let responseLength = Math.min(response.hits.length, 10);
				for (let i = 0; i < responseLength; i++) {
					hitNames.push(response.hits[i].name);
				}
				let updatedMemes = [];

				fb.postsCollection
					.where('name', 'in', hitNames)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							console.log(`doc name is ${doc.data().name}`);
							updatedMemes.push(doc.data());
						});
						store.commit('setCurrentMemes', updatedMemes);
					});
			});
		},
	},
};
