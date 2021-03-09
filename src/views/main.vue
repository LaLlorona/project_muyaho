<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="3"
				xl="3"
				v-for="item in this.memes"
				:key="item.id"
			>
				<v-card class="mx-auto my-12">
					<v-img height="250" :src="item.thumbnail"></v-img>

					<v-card-title>{{ item.name }}</v-card-title>

					<v-card-text>
						<div class="my-1 subtitle-1">
							<span
								class="material-icons"
								v-if="isLogin && currentLikeMemes.includes(item.postId)"
							>
								favorite
							</span>
							<span
								class="material-icons haveAction"
								@click="likeMeme(item.postId, item.likes)"
								v-else
							>
								favorite_border
							</span>

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
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Mixin from '@/mixins/Mixin.js';
export default {
	data() {
		return {
			memes: [],
		};
	},
	mixins: [Mixin],
	computed: {
		currentLikeMemes() {
			return this.$store.state.userProfile.likedMemes;
		},
	},
	methods: {
		likeMeme(postId, numLikes) {
			console.log('like it');
			this.$store.dispatch('likeMeme', { postId, numLikes });
		},
	},
	async created() {
		await this.$store.dispatch('fetchAllMemes');
		this.memes = this.$store.state.currentMemes;
	},
};
</script>

<style scoped>
.haveAction {
	cursor: pointer;
}
</style>
