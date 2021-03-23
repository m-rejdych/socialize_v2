import createAction from '../../util/actionFactory';
import {
  CreatePostAction,
  CreatePostSuccessAction,
  GetFeedAction,
  GetFeedSuccessAction,
  UpdatePostAction,
  UpdatePostSuccessAction,
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

export const updatePost: UpdatePostAction = createAction(POST.UPDATE_POST);

export const updatePostSuccess: UpdatePostSuccessAction = createAction(
  POST.UPDATE_POST_SUCCESS,
);

export const setPostError: SetPostErrorAction = createAction(POST.ERROR);
