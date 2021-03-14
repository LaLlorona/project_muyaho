<template>
	<v-container>
		<ais-instant-search
			:search-client="searchClient"
			index-name="firebase_query"
		>
			<ais-search-box placeholder="Search here…" class="searchbox" />
			<ais-hits>
				<template slot="item" slot-scope="{ item }">
					<h1><ais-highlight :hit="item" attribute="name" /></h1>
					<p><ais-highlight :hit="item" attribute="description" /></p>
				</template>
			</ais-hits>
		</ais-instant-search>
	</v-container>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
export default {
	data() {
		return {
			searchWord: '',
			searchClient: algoliasearch(
				'X3LM926NK1',
				'9435c0f6dfcce9c3bec66562a2646d06',
			),
		};
	},
};
</script>

<style></style>
