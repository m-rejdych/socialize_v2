import Action from '../store/action';
import Comment from './comment';
import { COMMENT } from '../../shared/constants/actionTypes';
import { CreateCommentReq } from './commentReq';

export type CreateCommentAction = Action<
  typeof COMMENT.CREATE_COMMENT,
  CreateCommentReq
>;

export type CreateCommentSuccessAction = Action<
  typeof COMMENT.CREATE_COMMENT_SUCCESS,
  Comment
>;
