import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';
import {
  CreatePostAction,
  CreatePostSuccessAction,
  GetFeedAction,
  GetFeedSuccessAction,
  UpdatePostAction,
  UpdatePostSuccessAction,
  SetPostErrorAction,
} from '../../interfaces/post/postActions';
import PostState from '../../interfaces/post/postState';
import { POST } from '../../shared/constants/actionTypes';

const initialState: PostState = {
  feed: [],
  selectedPost: null,
  loading: false,
  initialLoad: false,
  error: null,
};

const strategyMap: StrategyMap<PostState, typeof POST> = {
  [POST.CREATE_POST]: createPostTransformer,
  [POST.CREATE_POST_SUCCESS]: createPostSuccessTransformer,
  [POST.GET_FEED]: getFeedTransformer,
  [POST.GET_FEED_SUCCESS]: getFeedSuccessTransformer,
  [POST.UPDATE_POST]: updatePostTransformer,
  [POST.UPDATE_POST_SUCCESS]: updatePostSuccessTransformer,
  [POST.ERROR]: setPostErrorTransformer,
};

const postReducer = createReducer<PostState, typeof POST>(
  strategyMap,
  initialState,
);

function createPostTransformer(
  state: PostState,
  _: ReturnType<CreatePostAction>,
): PostState {
  return { ...state, loading: true };
}

function createPostSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<CreatePostSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: [payload, ...state.feed],
  };
}

function getFeedTransformer(
  state: PostState,
  _: ReturnType<GetFeedAction>,
): PostState {
  return { ...state, loading: true };
}

function getFeedSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<GetFeedSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    initialLoad: true,
    error: null,
    feed: payload,
  };
}

function updatePostTransformer(
  state: PostState,
  _: ReturnType<UpdatePostAction>,
): PostState {
  return { ...state, loading: true };
}

function updatePostSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<UpdatePostSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: state.feed.map((post) => (post.id === payload.id ? payload : post)),
  };
}

function setPostErrorTransformer(
  state: PostState,
  { payload }: ReturnType<SetPostErrorAction>,
): PostState {
  return { ...state, loading: false, initialLoad: true, error: payload };
}

export default postReducer;
