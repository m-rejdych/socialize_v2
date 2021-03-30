import Action from '../store/action';
import Comment from './comment';
import { COMMENT } from '../../shared/constants/actionTypes';
import { CreateCommentReq, AddCommentReactionReq } from './commentReq';
import {
  DeleteCommentSuccessPayload,
  DeleteCommentReactionSuccessPayload,
} from './commentPayloads';

export type CreateCommentAction = Action<
  typeof COMMENT.CREATE_COMMENT,
  CreateCommentReq
>;

export type CreateCommentSuccessAction = Action<
  typeof COMMENT.CREATE_COMMENT_SUCCESS,
  Comment
>;

export type DeleteCommentAction = Action<typeof COMMENT.DELETE_COMMENT, number>;

export type DeleteCommentSuccessAction = Action<
  typeof COMMENT.DELETE_COMMENT_SUCCESS,
  DeleteCommentSuccessPayload
>;

export type AddCommentReactionAction = Action<
  typeof COMMENT.ADD_COMMENT_REACTION,
  AddCommentReactionReq
>;

export type AddCommentReactionSuccessAction = Action<
  typeof COMMENT.ADD_COMMENT_REACTION_SUCCESS,
  Comment
>;

export type DeleteCommentReactionAction = Action<
  typeof COMMENT.DELETE_COMMENT_REACTION,
  number
>;

export type DeleteCommentReactionSuccessAction = Action<
  typeof COMMENT.DELETE_COMMENT_REACTION_SUCCESS,
  DeleteCommentReactionSuccessPayload
>;
