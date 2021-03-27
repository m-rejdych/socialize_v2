import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';
import {
  CreatePostAction,
  CreatePostSuccessAction,
  GetFeedAction,
  GetFeedSuccessAction,
  UpdatePostAction,
  UpdatePostSuccessAction,
  DeletePostAction,
  DeletePostSuccessAction,
  AddPostReactionAction,
  DeletePostReactionAction,
  DeletePostReactionSuccessAction,
  SetPostErrorAction,
} from '../../interfaces/post/postActions';
import {
  CreateCommentAction,
  CreateCommentSuccessAction,
} from '../../interfaces/comment/commentActions';
import PostState from '../../interfaces/post/postState';
import { POST, COMMENT } from '../../shared/constants/actionTypes';

const initialState: PostState = {
  feed: [],
  selectedPost: null,
  loading: false,
  initialLoad: false,
  error: null,
};

const strategyMap: StrategyMap<PostState, typeof POST & typeof COMMENT> = {
  [POST.CREATE_POST]: createPostTransformer,
  [POST.CREATE_POST_SUCCESS]: createPostSuccessTransformer,
  [POST.GET_FEED]: getFeedTransformer,
  [POST.GET_FEED_SUCCESS]: getFeedSuccessTransformer,
  [POST.UPDATE_POST]: updatePostTransformer,
  [POST.UPDATE_POST_SUCCESS]: updatePostSuccessTransformer,
  [POST.DELETE_POST]: deletePostTransformer,
  [POST.DELETE_POST_SUCCESS]: deletePostSuccessTransformer,
  [POST.ADD_POST_REACTION]: addPostReactionTransformer,
  [POST.DELETE_POST_REACTION]: deletePostReactionTransformer,
  [POST.DELETE_POST_REACTION_SUCCESS]: deletePostReactionSuccessTransformer,
  [COMMENT.CREATE_COMMENT]: createCommentTransformer,
  [COMMENT.CREATE_COMMENT_SUCCESS]: createCommentSuccessTransformer,
  [POST.ERROR]: setPostErrorTransformer,
};

const postReducer = createReducer<PostState, typeof POST & typeof COMMENT>(
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

function deletePostTransformer(
  state: PostState,
  _: ReturnType<DeletePostAction>,
): PostState {
  return { ...state, loading: true };
}

function deletePostSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<DeletePostSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: state.feed.filter(({ id }) => id !== payload),
  };
}

function addPostReactionTransformer(
  state: PostState,
  _: ReturnType<AddPostReactionAction>,
): PostState {
  return { ...state, loading: true };
}

function deletePostReactionTransformer(
  state: PostState,
  _: ReturnType<DeletePostReactionAction>,
): PostState {
  return { ...state, loading: true };
}

function deletePostReactionSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<DeletePostReactionSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: state.feed.map((post) =>
      post.id === payload.postId
        ? {
            ...post,
            reactions:
              post.reactions?.filter(
                (reaction) => reaction.id !== payload.reactionId,
              ) || [],
          }
        : post,
    ),
  };
}

function createCommentTransformer(
  state: PostState,
  _: ReturnType<CreateCommentAction>,
): PostState {
  return { ...state, loading: true };
}

function createCommentSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<CreateCommentSuccessAction>,
): PostState {
  return {
    ...state,
    feed: state.feed.map((post) =>
      post.id === payload.post?.id
        ? {
            ...post,
            comments: post.comments ? [...post.comments, payload] : [payload],
          }
        : post,
    ),
  };
}

function setPostErrorTransformer(
  state: PostState,
  { payload }: ReturnType<SetPostErrorAction>,
): PostState {
  return { ...state, loading: false, initialLoad: true, error: payload };
}

export default postReducer;
