import Post from './post';

export interface CreatePostRes {
  data?: Post;
}

export interface GetFeedRes {
  data?: Post[];
}

export interface DeletePostRes {
  data?: {
    postId: number;
    authorId: number;
    deleted: boolean;
  };
}

export interface DeletePostReactionRes {
  data?: {
    postId: number;
    userId: number;
    reactionId: number;
    deleted: boolean;
  };
}
