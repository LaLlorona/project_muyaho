<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="4"
				xl="3"
				v-for="item in this.memes"
				:key="item.id"
			>
				<v-card class="mx-auto my-12">
					<v-img height="250" :src="item.thumbnail"></v-img>

					<v-card-title>{{ item.name }}</v-card-title>

					<v-card-text>
						<div class="my-1 subtitle-1">
							<span class="material-icons">
								favorite_border
							</span>
							<!-- <span class="material-icons">
						favorite
					</span> -->
							<span class="material-icons">
								comment
							</span>
						</div>
						<div>좋아요 {{ item.likes }}</div>
					</v-card-text>

					<v-divider class="mx-4"></v-divider>

					<v-card-text>
						{{ item.explanation }}
					</v-card-text>

					<v-card-actions>
						<v-btn color="deep-purple lighten-2" text>
							좋아요
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			memes: [],
		};
	},
	async created() {
		this.memes = await this.$store.dispatch('fetchAllMemes');
	},
};
</script>

<style></style>
