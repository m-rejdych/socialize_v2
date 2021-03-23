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
