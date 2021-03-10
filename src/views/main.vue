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
								class="material-icons tryToUnlike"
								style="color: #DC143C"
								@click="unlikeMeme(item.postId, item.likes)"
								v-if="isLogin && currentLikeMemes.includes(item.postId)"
							>
								favorite
							</span>
							<span
								class="material-icons tryToLike"
								@click="likeMeme(item.postId, item.likes)"
								v-else
							>
								favorite_border
							</span>

							<v-dialog
								transition="dialog-bottom-transition"
								max-width="600"
								v-model="dialog[item.postId + '_comment']"
							>
								<template v-slot:activator="{ on, attrs }">
									<span
										class="material-icons tryToLike"
										v-bind="attrs"
										v-on="on"
										@click.stop="$set(dialog, item.postId + '_comment', true)"
									>
										comment
									</span>
								</template>

								<v-card>
									<v-toolbar color="primary" dark
										><v-card-actions class="justify-end">
											<span
												class="material-icons tryToLike"
												@click="closeDialog(item.postId + '_comment')"
											>
												close
											</span>
										</v-card-actions></v-toolbar
									>

									<v-card-title class="mt-2">
										<v-avatar size="30">
											<img alt="user" :src="item.thumbnail" />
										</v-avatar>
										<p class="ml-3">
											{{ item.name }}
										</p>
									</v-card-title>
									<v-card-text>
										{{ item.explanation }}
									</v-card-text>
									<v-divider class="mx-4"></v-divider>

									<v-card-text>
										<form @submit.prevent="uploadComment(item)">
											<v-row>
												<v-col cols="12">
													<v-textarea
														name="comment"
														label="댓글남기기"
														v-model="comment"
														required
													></v-textarea>
												</v-col>
												<v-col cols="10"></v-col>
												<v-col cols="2">
													<v-btn
														type="submit"
														color="orange"
														dark
														class="text-right"
														>쓰기</v-btn
													>
												</v-col>
											</v-row>

											<v-alert
												class="mt-3"
												type="error"
												dismissible
												v-model="alert"
												>{{ getErrorMessage }}</v-alert
											>
										</form>
									</v-card-text>
								</v-card>
							</v-dialog>
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
import {
	commentsCollection,
	postsCollection,
	auth,
} from '@/datasources/firebase';
export default {
	data() {
		return {
			memes: [],
			dialog: {},
			alert: false,
			comment: '',
		};
	},
	mixins: [Mixin],
	computed: {
		currentLikeMemes() {
			return this.$store.state.userProfile.likedMemes;
		},
		getErrorMessage() {
			return 'asdf';
		},
	},
	methods: {
		likeMeme(postId, numLikes) {
			console.log('like it');
			this.$store.dispatch('likeMeme', { postId, numLikes });
		},

		unlikeMeme(postId, numLikes) {
			this.$store.dispatch('unlikeMeme', { postId, numLikes });
		},
		closeDialog(postId) {
			console.log(`post id is ${postId}`);
			this.dialog[postId] = false;
		},

		async uploadComment(postInfo) {
			try {
				await commentsCollection.add({
					createOn: new Date(),
					content: this.comment,
					postId: postInfo.postId,
					userId: auth.currentUser.uid,
					userName: this.$store.state.userProfile.name,
				});

				await postsCollection.doc(postInfo.postId).update({
					comments: postInfo.comments + 1,
				});

				this.comment = '';
				this.closeDialog(postInfo.postId + '_comment');
			} catch (error) {
				console.log(error);
			}
		},
	},
	async created() {
		await this.$store.dispatch('fetchAllMemes');
		this.memes = this.$store.state.currentMemes;
	},
};
</script>

<style scoped>
.tryToUnlike:hover {
	cursor: pointer;
	color: grey !important;
}
.tryToLike:hover {
	cursor: pointer;
	color: #dc143c;
}
</style>
