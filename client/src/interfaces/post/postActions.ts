import Action from '../store/action';
import Post from './post';
import { POST } from '../../shared/constants/actionTypes';
import { CreatePostReq } from './postReq';

export type CreatePostAction = Action<typeof POST.CREATE_POST, CreatePostReq>;

export type CreatePostSuccessAction = Action<
  typeof POST.CREATE_POST_SUCCESS,
  Post
>;

export type SetPostErrorAction = Action<typeof POST.ERROR, string | null>;
