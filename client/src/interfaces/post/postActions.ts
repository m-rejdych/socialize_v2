import Action from '../store/action';
import Post from './post';
import { POST } from '../../shared/constants/actionTypes';
import { CreatePostReq, UpdatePostReq, AddPostReactionReq } from './postReq';
import { DeletePostReactionSuccessPayload } from './postPayloads';

export type CreatePostAction = Action<typeof POST.CREATE_POST, CreatePostReq>;

export type CreatePostSuccessAction = Action<
  typeof POST.CREATE_POST_SUCCESS,
  Post
>;

export type GetFeedAction = Action<typeof POST.GET_FEED, null>;

export type GetFeedSuccessAction = Action<typeof POST.GET_FEED_SUCCESS, Post[]>;

export type GetSelectedPostAction = Action<
  typeof POST.GET_SELECTED_POST,
  number
>;

export type GetSelectedPostSuccesAction = Action<
  typeof POST.GET_SELECTED_POST_SUCCESS,
  Post | null
>;

export type UpdatePostAction = Action<typeof POST.UPDATE_POST, UpdatePostReq>;

export type UpdatePostSuccessAction = Action<
  typeof POST.UPDATE_POST_SUCCESS,
  Post
>;

export type DeletePostAction = Action<typeof POST.DELETE_POST, number>;

export type DeletePostSuccessAction = Action<
  typeof POST.DELETE_POST_SUCCESS,
  number
>;

export type AddPostReactionAction = Action<
  typeof POST.ADD_POST_REACTION,
  AddPostReactionReq
>;

export type DeletePostReactionAction = Action<
  typeof POST.DELETE_POST_REACTION,
  number
>;

export type DeletePostReactionSuccessAction = Action<
  typeof POST.DELETE_POST_REACTION_SUCCESS,
  DeletePostReactionSuccessPayload
>;

export type SetPostErrorAction = Action<typeof POST.ERROR, string | null>;
