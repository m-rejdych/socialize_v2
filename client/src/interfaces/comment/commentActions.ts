import Action from '../store/action';
import Comment from './comment';
import { COMMENT } from '../../shared/constants/actionTypes';
import { CreateCommentReq } from './commentReq';
import { DeleteCommentSuccessPayload } from './commentPayloads';

export type CreateCommentAction = Action<
  typeof COMMENT.CREATE_COMMENT,
  CreateCommentReq
>;

export type CreateCommentSuccessAction = Action<
  typeof COMMENT.CREATE_COMMENT_SUCCESS,
  Comment
>;

export type DeleteCommentAciton = Action<typeof COMMENT.DELETE_COMMENT, number>;

export type DeleteCommentSuccessAction = Action<
  typeof COMMENT.DELETE_COMMENT_SUCCESS,
  DeleteCommentSuccessPayload
>;
