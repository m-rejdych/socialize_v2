import createAction from '../../util/actionFactory';
import {
  CreatePostAction,
  CreatePostSuccessAction,
  SetPostErrorAction,
} from '../../interfaces/post/postActions';
import { POST } from '../../shared/constants/actionTypes';

export const createPost: CreatePostAction = createAction(POST.CREATE_POST);

export const createPostSuccess: CreatePostSuccessAction = createAction(
  POST.CREATE_POST_SUCCESS,
);

export const setPostError: SetPostErrorAction = createAction(POST.ERROR);
