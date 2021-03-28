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
