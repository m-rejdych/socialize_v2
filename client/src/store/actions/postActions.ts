import createAction from '../../util/actionFactory';
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
import { POST } from '../../shared/constants/actionTypes';

export const createPost: CreatePostAction = createAction(POST.CREATE_POST);

export const createPostSuccess: CreatePostSuccessAction = createAction(
  POST.CREATE_POST_SUCCESS,
);

export const getFeed: GetFeedAction = createAction(POST.GET_FEED);

export const getFeedSuccess: GetFeedSuccessAction = createAction(
  POST.GET_FEED_SUCCESS,
);

export const getSelectedPost: GetSelectedPostAction = createAction(
  POST.GET_SELECTED_POST,
);

export const getSelectedPostSuccess: GetSelectedPostSuccesAction = createAction(
  POST.GET_SELECTED_POST_SUCCESS,
);

export const updatePost: UpdatePostAction = createAction(POST.UPDATE_POST);

export const updatePostSuccess: UpdatePostSuccessAction = createAction(
  POST.UPDATE_POST_SUCCESS,
);

export const deletePost: DeletePostAction = createAction(POST.DELETE_POST);

export const deletePostSuccess: DeletePostSuccessAction = createAction(
  POST.DELETE_POST_SUCCESS,
);

export const addPostReaction: AddPostReactionAction = createAction(
  POST.ADD_POST_REACTION,
);

export const deletePostReaction: DeletePostReactionAction = createAction(
  POST.DELETE_POST_REACTION,
);

export const deletePostReactionSuccess: DeletePostReactionSuccessAction = createAction(
  POST.DELETE_POST_REACTION_SUCCESS,
);

export const setPostError: SetPostErrorAction = createAction(POST.ERROR);
