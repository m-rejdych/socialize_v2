import Action from '../store/action';
import Post from './post';
import { POST } from '../../shared/constants/actionTypes';
import { CreatePostReq, UpdatePostReq } from './postReq';

export type CreatePostAction = Action<typeof POST.CREATE_POST, CreatePostReq>;

export type CreatePostSuccessAction = Action<
  typeof POST.CREATE_POST_SUCCESS,
  Post
>;

export type GetFeedAction = Action<typeof POST.GET_FEED, null>;

export type GetFeedSuccessAction = Action<typeof POST.GET_FEED_SUCCESS, Post[]>;

export type UpdatePostAction = Action<typeof POST.UPDATE_POST, UpdatePostReq>;

export type UpdatePostSuccessAction = Action<
  typeof POST.UPDATE_POST_SUCCESS,
  Post
>;

export type SetPostErrorAction = Action<typeof POST.ERROR, string | null>;
