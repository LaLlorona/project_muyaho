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
				<v-card-title
					>{{ item.name }}
					<v-row align="center" justify="end">
						<span class="body-2 mr-2">by {{ item.userName }}</span>
					</v-row>
				</v-card-title>

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
									@click.stop="
										checkUserAuthAndUpdateDialog(
											item.postId + '_comment',
											'open',
										)
									"
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
									<form @submit.prevent="uploadCommentAndRetriveComments(item)">
										<v-row>
											<v-col cols="12">
												<v-textarea
													name="comment"
													label="댓글남기기"
													v-model="comment"
													clearable
													clear-icon="mdi-close-circle"
													:rules="[
														v =>
															(v || '').length < 200 ||
															'댓글은 200자 미만이어야 합니다.',
													]"
													maxlength="200"
													required
												></v-textarea>
											</v-col>
											<v-col cols="8"></v-col>
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
			<span v-if="$vuetify.breakpoint.smAndUp">
				<v-main style="height:93.3vh" class="py-0">
					<v-container
						fluid
						pa-0
						class="d-flex flex-column flex-grow-1 fill-parent-height"
					>
						<!-- <v-row no-gutters class="top-row"> -->
						<v-row no-gutters class="top-row flex-grow-1 flex-shrink-1">
							<v-col cols="8" class="grid-item-blue fill-parent-height">
								<div class="image">
									<div class="overlay">
										<span
											class="material-icons tryToUnlike"
											style="color: #DC143C; font-size:45px"
											@click.stop="unlikeMeme(item.postId, item.likes)"
											v-if="isLogin && currentLikeMemes.includes(item.postId)"
										>
											favorite
										</span>
										<span
											class="material-icons tryToLike"
											style="font-size:45px;color: grey"
											@click.stop="likeMeme(item.postId, item.likes)"
											v-else
										>
											favorite_border
										</span>
										<span
											class="material-icons tryToLike"
											style="font-size:45px;color:grey"
											@click.stop="
												checkUserAuthAndUpdateDialog(
													item.postId + '_comment',
													'open',
												)
											"
										>
											comment
										</span>
									</div>
									<v-img :src="item.thumbnail" class="center-fit"></v-img>
								</div>
							</v-col>
							<v-col cols="4" class="grid-item-green fill-parent-height">
								<div v-if="isLoading">
									<v-progress-circular
										indeterminate
										color="primary"
									></v-progress-circular>
								</div>
								<div v-if="!isLoading && !currentPostComments.length">
									<v-img src="@/assets/doge.jpg" contain></v-img>
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

									<v-card-actions>
										<span
											class="material-icons tryToUnlike"
											style="color: #DC143C"
											@click.stop="unlikeComment(comment.id, comment.likes)"
											v-if="isLogin && currentLikeComments.includes(comment.id)"
										>
											thumb_up
										</span>
										<span
											class="material-icons tryToLike"
											@click.stop="likeComment(comment.id, comment.likes)"
											v-else
										>
											thumb_up_off_alt
										</span>
										<span class="subheading mr-2">{{
											comment.likes
										}}</span></v-card-actions
									>
								</v-card>
							</v-col>
						</v-row>
						<!-- <v-row no-gutters class="bottom-row"> -->
					</v-container>
				</v-main>
			</span>
			<!-- when mobile page -->
			<span v-else>
				<v-main class="py-0">
					<v-container fluid>
						<!-- <v-row no-gutters class="top-row"> -->

						<div class="overlay">
							<span
								class="material-icons tryToUnlike"
								style="color: #DC143C; font-size:45px"
								@click.stop="unlikeMeme(item.postId, item.likes)"
								v-if="isLogin && currentLikeMemes.includes(item.postId)"
							>
								favorite
							</span>
							<span
								class="material-icons tryToLike"
								style="font-size:45px;color: grey"
								@click.stop="likeMeme(item.postId, item.likes)"
								v-else
							>
								favorite_border
							</span>
							<span
								class="material-icons tryToLike"
								style="font-size:45px;color:grey"
								@click.stop="
									checkUserAuthAndUpdateDialog(item.postId + '_comment', 'open')
								"
							>
								comment
							</span>
						</div>
						<v-img :src="item.thumbnail" class="center-fit-mobile"></v-img>

						<div class="scrollable">
							<div v-if="isLoading">
								<v-progress-circular
									indeterminate
									color="primary"
								></v-progress-circular>
							</div>
							<div v-if="!isLoading && !currentPostComments.length">
								<v-img src="@/assets/doge.jpg" contain></v-img>
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

								<v-card-actions>
									<span
										class="material-icons tryToUnlike"
										style="color: #DC143C"
										@click.stop="unlikeComment(comment.id, comment.likes)"
										v-if="isLogin && currentLikeComments.includes(comment.id)"
									>
										thumb_up
									</span>
									<span
										class="material-icons tryToLike"
										@click.stop="likeComment(comment.id, comment.likes)"
										v-else
									>
										thumb_up_off_alt
									</span>
									<span class="subheading mr-2">{{
										comment.likes
									}}</span></v-card-actions
								>
							</v-card>
						</div>
					</v-container>
				</v-main>
			</span>
		</v-card>
	</v-dialog>
</template>

<script>
import Mixin from '@/mixins/Mixin.js';
import {
	commentsCollection,
	postsCollection,
	usersCollection,
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
		currentLikeComments() {
			return this.$store.state.userProfile.likedComments;
		},
		getErrorMessage() {
			return 'asdf';
		},
	},
	methods: {
		async likeMeme(postId, numLikes) {
			// await this.$store.dispatch('likeMeme', { postId, numLikes });
			this.$emit('likeMeme', { postId, numLikes });
		},

		async unlikeMeme(postId, numLikes) {
			// await this.$store.dispatch('unlikeMeme', { postId, numLikes });
			this.$emit('unlikeMeme', { postId, numLikes });
		},
		updateDialog(postId, action) {
			if (action == 'close') {
				this.$set(this.dialog, postId, false);
			} else {
				this.$set(this.dialog, postId, true);
			}
		},
		checkUserAuthAndUpdateDialog(postId, action) {
			if (!auth.currentUser) {
				router.push('/login');
				return;
			}
			this.updateDialog(postId, action);
		},

		async updateDialogAndGetComment(postId) {
			this.updateDialog(postId + '_info', true);
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
					likes: 0,
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
				.orderBy('createOn', 'desc')
				.where('postId', '==', postId)

				.get();
			docs.forEach(doc => {
				let comment = doc.data();
				comment.id = doc.id;
				currentComments.push(comment);
			});
			this.currentPostComments = currentComments;
			this.isLoading = false;
		},
		async uploadCommentAndRetriveComments(postInfo) {
			await this.uploadComment(postInfo);
			await this.retrievecomments(postInfo.postId);
		},
		async likeComment(commentId, commentLikes) {
			if (!auth.currentUser) {
				router.push('/login');
				return;
			}
			try {
				const userId = auth.currentUser.uid;
				await commentsCollection.doc(commentId).update({
					likes: commentLikes + 1,
				});
				let toUpdate = this.$store.state.userProfile.likedComments;
				toUpdate.push(commentId);
				await usersCollection.doc(userId).update({
					likedComments: toUpdate,
				});
				for (let i = 0; i < this.currentPostComments.length; i++) {
					if (this.currentPostComments[i].id == commentId) {
						this.currentPostComments[i].likes++;
					}
				}
			} catch (error) {
				console.log(error);
			}
		},

		async unlikeComment(commentId, commentLikes) {
			try {
				const userId = auth.currentUser.uid;
				await commentsCollection.doc(commentId).update({
					likes: commentLikes - 1,
				});
				let toUpdate = this.$store.state.userProfile.likedComments;
				let index = toUpdate.indexOf(commentId);
				if (index > -1) {
					toUpdate.splice(index, 1);
					await usersCollection.doc(userId).update({
						likedComments: toUpdate,
					});
				}

				for (let i = 0; i < this.currentPostComments.length; i++) {
					if (this.currentPostComments[i].id == commentId) {
						this.currentPostComments[i].likes--;
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
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
	color: #dc143c !important;
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

.image {
	position: relative;
}

.overlay {
	position: absolute;
	right: 0;
	z-index: 5;
}

.center-fit-mobile {
	max-width: 100%;
	max-height: 27vh;
	margin: auto;
}

.center-fit {
	max-width: 100%;
	max-height: 93.3vh;
	margin: auto;
}

.scrollable {
	overflow-y: scroll;
	max-height: 60vh;
}
</style>
