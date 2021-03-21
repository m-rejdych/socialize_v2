import Post from './post';

export interface CreatePostRes {
  data?: Post;
}

export interface GetFeedRes {
  data?: Post[];
}
