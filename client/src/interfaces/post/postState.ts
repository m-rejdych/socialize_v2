import Post from './post';

export default interface PostState {
  feed: Post[];
  selectedPost: Post | null;
  loading: boolean;
  initialLoad: boolean;
  error: null | string;
}
