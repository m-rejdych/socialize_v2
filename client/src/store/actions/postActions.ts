import createAction from '../../util/actionFactory';
import {
  CreatePostAction,
  CreatePostSuccessAction,
  GetFeedAction,
  GetFeedSuccessAction,
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

export const setPostError: SetPostErrorAction = createAction(POST.ERROR);
