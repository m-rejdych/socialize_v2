import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';
import {
  CreatePostAction,
  CreatePostSuccessAction,
  GetFeedAction,
  GetFeedSuccessAction,
  GetSelectedPostAction,
  GetSelectedPostSuccesAction,
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
  DeleteCommentAction,
  DeleteCommentSuccessAction,
  AddCommentReactionAction,
  AddCommentReactionSuccessAction,
  DeleteCommentReactionAction,
  DeleteCommentReactionSuccessAction,
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
  [POST.GET_SELECTED_POST]: getSelectedPostTransformer,
  [POST.GET_SELECTED_POST_SUCCESS]: getSelectedPostSuccessTransformer,
  [POST.UPDATE_POST]: updatePostTransformer,
  [POST.UPDATE_POST_SUCCESS]: updatePostSuccessTransformer,
  [POST.DELETE_POST]: deletePostTransformer,
  [POST.DELETE_POST_SUCCESS]: deletePostSuccessTransformer,
  [POST.ADD_POST_REACTION]: addPostReactionTransformer,
  [POST.DELETE_POST_REACTION]: deletePostReactionTransformer,
  [POST.DELETE_POST_REACTION_SUCCESS]: deletePostReactionSuccessTransformer,
  [COMMENT.CREATE_COMMENT]: createCommentTransformer,
  [COMMENT.CREATE_COMMENT_SUCCESS]: createCommentSuccessTransformer,
  [COMMENT.DELETE_COMMENT]: deleteCommentTransformer,
  [COMMENT.DELETE_COMMENT_SUCCESS]: deleteCommentSuccessTransformer,
  [COMMENT.ADD_COMMENT_REACTION]: addCommentReactionTransformer,
  [COMMENT.ADD_COMMENT_REACTION_SUCCESS]: addCommentREactionSuccessTransfomer,
  [COMMENT.DELETE_COMMENT_REACTION]: deleteCommentReactionTransformer,
  [COMMENT.DELETE_COMMENT_REACTION_SUCCESS]: deleteCommentReactionSuccessTransformer,
  [POST.ERROR]: setPostErrorTransformer,
};

const postReducer = createReducer(strategyMap, initialState);

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

function getSelectedPostTransformer(
  state: PostState,
  _: ReturnType<GetSelectedPostAction>,
): PostState {
  return { ...state, loading: true };
}

function getSelectedPostSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<GetSelectedPostSuccesAction>,
): PostState {
  return { ...state, loading: false, error: null, selectedPost: payload };
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
    selectedPost:
      state.selectedPost?.id === payload.id ? payload : state.selectedPost,
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
    selectedPost:
      state.selectedPost?.id === payload ? null : state.selectedPost,
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
    selectedPost:
      state.selectedPost?.id === payload.postId
        ? {
            ...state.selectedPost,
            reactions:
              state.selectedPost.reactions?.filter(
                (reaction) => reaction.id !== payload.reactionId,
              ) || [],
          }
        : state.selectedPost,
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
    loading: false,
    error: null,
    feed: state.feed.map((post) =>
      post.id === payload.post?.id
        ? {
            ...post,
            comments: post.comments ? [...post.comments, payload] : [payload],
          }
        : post,
    ),
    selectedPost:
      state.selectedPost?.id === payload.post!.id
        ? {
            ...state.selectedPost,
            comments: state.selectedPost?.comments
              ? [...state.selectedPost.comments, payload]
              : [payload],
          }
        : state.selectedPost,
  };
}

function deleteCommentTransformer(
  state: PostState,
  _: ReturnType<DeleteCommentAction>,
): PostState {
  return { ...state, loading: true };
}

function deleteCommentSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<DeleteCommentSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: state.feed.map((post) =>
      post.id === payload.postId
        ? {
            ...post,
            comments: post.comments
              ? post.comments.filter(({ id }) => id !== payload.commentId)
              : [],
          }
        : post,
    ),
    selectedPost:
      state.selectedPost?.id === payload.postId
        ? {
            ...state.selectedPost,
            comments: state.selectedPost.comments
              ? state.selectedPost.comments.filter(
                  ({ id }) => id !== payload.commentId,
                )
              : [],
          }
        : state.selectedPost,
  };
}

function addCommentReactionTransformer(
  state: PostState,
  _: ReturnType<AddCommentReactionAction>,
): PostState {
  return { ...state, loading: true };
}

function addCommentREactionSuccessTransfomer(
  state: PostState,
  { payload }: ReturnType<AddCommentReactionSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: state.feed.map((post) =>
      post.id === payload.post?.id
        ? {
            ...post,
            comments: post.comments
              ? post.comments.map((comment) =>
                  comment.id === payload.id ? payload : comment,
                )
              : [payload],
          }
        : post,
    ),
    selectedPost:
      state.selectedPost?.id === payload.post!.id
        ? {
            ...state.selectedPost,
            comments: state.selectedPost.comments
              ? state.selectedPost.comments.map((comment) =>
                  comment.id === payload.id ? payload : comment,
                )
              : [payload],
          }
        : state.selectedPost,
  };
}

function deleteCommentReactionTransformer(
  state: PostState,
  _: ReturnType<DeleteCommentReactionAction>,
): PostState {
  return { ...state, loading: true };
}

function deleteCommentReactionSuccessTransformer(
  state: PostState,
  { payload }: ReturnType<DeleteCommentReactionSuccessAction>,
): PostState {
  return {
    ...state,
    loading: false,
    error: null,
    feed: state.feed.map((post) =>
      post.id === payload.postId
        ? {
            ...post,
            comments: post.comments
              ? post.comments.map((comment) =>
                  comment.id === payload.commentId
                    ? {
                        ...comment,
                        reactions: comment.reactions
                          ? comment.reactions.filter(
                              ({ id }) => id !== payload.reactionId,
                            )
                          : [],
                      }
                    : comment,
                )
              : [],
          }
        : post,
    ),
    selectedPost:
      state.selectedPost?.id === payload.postId
        ? {
            ...state.selectedPost,
            comments: state.selectedPost.comments
              ? state.selectedPost.comments.map((comment) =>
                  comment.id === payload.commentId
                    ? {
                        ...comment,
                        reactions: comment.reactions
                          ? comment.reactions.filter(
                              ({ id }) => id !== payload.reactionId,
                            )
                          : [],
                      }
                    : comment,
                )
              : [],
          }
        : state.selectedPost,
  };
}

function setPostErrorTransformer(
  state: PostState,
  { payload }: ReturnType<SetPostErrorAction>,
): PostState {
  return { ...state, loading: false, initialLoad: true, error: payload };
}

export default postReducer;
