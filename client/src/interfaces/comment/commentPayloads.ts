export interface DeleteCommentSuccessPayload {
  postId: number;
  commentId: number;
}

export interface DeleteCommentReactionSuccessPayload {
  postId: number;
  commentId: number;
  reactionId: number;
}
