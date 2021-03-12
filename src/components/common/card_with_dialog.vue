<template>
	<v-dialog
		v-model="dialog[item.postId + '_info']"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-card
				class="mx-auto my-12"
				v-bind="attrs"
				v-on="on"
				@click.stop="updateDialogAndGetComment(item.postId, 'open')"
			>
				<v-img height="250" :src="item.thumbnail"></v-img>
				<v-card-title>{{ item.name }}</v-card-title>

				<v-card-text>
					<div class="my-1 subtitle-1">
						<span
							class="material-icons tryToUnlike"
							style="color: #DC143C"
							@click.stop="unlikeMeme(item.postId, item.likes)"
							v-if="isLogin && currentLikeMemes.includes(item.postId)"
						>
							favorite
						</span>
						<span
							class="material-icons tryToLike"
							@click.stop="likeMeme(item.postId, item.likes)"
							v-else
						>
							favorite_border
						</span>

						<v-dialog
							transition="dialog-bottom-transition"
							max-width="600"
							v-model="dialog[item.postId + '_comment']"
						>
							>
							<template v-slot:activator="{ on, attrs }">
								<span
									class="material-icons tryToLike"
									v-bind="attrs"
									v-on="on"
									@click.stop="updateDialog(item.postId + '_comment', 'open')"
								>
									comment
								</span>
							</template>

							<v-card>
								<v-toolbar color="primary" dark
									><v-card-actions class="justify-end">
										<span
											class="material-icons tryToLike"
											@click.stop="
												updateDialog(item.postId + '_comment', 'close')
											"
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
													clearable
													clear-icon="mdi-close-circle"
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
		</template>

		<v-card>
			<v-toolbar dark color="primary">
				<v-btn
					icon
					dark
					@click.stop="updateDialog(item.postId + '_info', 'close')"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-main style="height:93.3vh" class="py-0">
				<v-container
					fluid
					pa-0
					class="d-flex flex-column flex-grow-1 fill-parent-height"
				>
					<!-- <v-row no-gutters class="top-row"> -->
					<v-row no-gutters class="top-row flex-grow-1 flex-shrink-1">
						<v-col cols="9" class="grid-item-blue fill-parent-height">
							<v-img
								:src="item.thumbnail"
								style="width:100%; height:100%; "
							></v-img>
						</v-col>
						<v-col cols="3" class="grid-item-green fill-parent-height">
							<div v-if="isLoading">
								<v-progress-circular
									indeterminate
									color="primary"
								></v-progress-circular>
							</div>
							<v-card
								class="mx-auto"
								color="third"
								v-else
								v-for="comment in currentPostComments"
								:key="comment.id"
							>
								<v-card-title>
									<v-list-item class="grow">
										<v-list-item-avatar color="grey darken-3">
											<v-img
												class="elevation-6"
												alt=""
												src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
											></v-img>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title class="subtitle-1">{{
												comment.userName
											}}</v-list-item-title>
										</v-list-item-content>
										<v-row align="center" justify="end">
											<span class="subtitle-2">{{
												comment.createOn | formatDate
											}}</span>
										</v-row>
									</v-list-item>
								</v-card-title>

								<v-card-text class="body-1 font-weight-bold">
									{{ comment.content }}
								</v-card-text>

								<v-card-actions> </v-card-actions>
							</v-card>
						</v-col>
					</v-row>
					<!-- <v-row no-gutters class="bottom-row"> -->
				</v-container>
			</v-main>
		</v-card>
	</v-dialog>
</template>

<script>
import Mixin from '@/mixins/Mixin.js';
import {
	commentsCollection,
	postsCollection,
	auth,
} from '@/datasources/firebase.js';
import router from '@/routes/index.js';
export default {
	data() {
		return {
			dialog: {},
			alert: false,
			comment: '',
			currentPostComments: [],
			isLoading: false,
		};
	},
	props: ['item'],
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
		async likeMeme(postId, numLikes) {
			console.log('like it');
			await this.$store.dispatch('likeMeme', { postId, numLikes });
		},

		async unlikeMeme(postId, numLikes) {
			await this.$store.dispatch('unlikeMeme', { postId, numLikes });
		},
		updateDialog(postId, action) {
			if (!auth.currentUser) {
				router.push('/login');
				return;
			}
			console.log(`post id is ${postId}`);
			if (action == 'close') {
				this.$set(this.dialog, postId, false);
			} else {
				this.$set(this.dialog, postId, true);
			}
		},

		async updateDialogAndGetComment(postId) {
			this.updateDialog(postId + '_info');
			this.retrievecomments(postId);
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
				this.updateDialog(postInfo.postId + '_comment', 'close');
			} catch (error) {
				console.log(error);
			}
		},

		async retrievecomments(postId) {
			this.isLoading = true;
			let currentComments = [];
			const docs = await commentsCollection
				.where('postId', '==', postId)
				// .orderBy('createOn')
				.get();
			docs.forEach(doc => {
				let comment = doc.data();
				comment.id = doc.id;
				currentComments.push(comment);
				console.log(comment);
			});
			this.currentPostComments = currentComments;
			this.isLoading = false;
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

.grid-item-green {
	overflow-y: scroll;
}

.grid-item-pink {
	height: 100px;
}
.grid-item-green > p {
	height: 9000px;
	border: 10px solid;
	margin: 20px;
}

.fill-parent-height {
	height: 100%;
}

.top-row {
	min-height: 0;
}
</style>
