import Comment from './comment';

export interface CreateCommentRes {
  data?: Comment;
}

export interface DeleteCommentRes {
  data?: {
    postId: number;
    authorId: number;
    commentId: number;
    deleted: boolean;
  };
}

export interface DeleteCommentReactionRes {
  data?: {
    reactionId: number;
    userId: number;
    commentId: number;
    postId: number;
    deleted: boolean;
  };
}
