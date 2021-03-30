import createAction from '../../util/actionFactory';
import {
  CreateCommentAction,
  CreateCommentSuccessAction,
  DeleteCommentAction,
  DeleteCommentSuccessAction,
  AddCommentReactionAction,
  AddCommentReactionSuccessAction,
  DeleteCommentReactionAction,
  DeleteCommentReactionSuccessAction,
} from '../../interfaces/comment/commentActions';
import { COMMENT } from '../../shared/constants/actionTypes';

export const createComment: CreateCommentAction = createAction(
  COMMENT.CREATE_COMMENT,
);

export const createCommentSuccess: CreateCommentSuccessAction = createAction(
  COMMENT.CREATE_COMMENT_SUCCESS,
);

export const deleteComment: DeleteCommentAction = createAction(
  COMMENT.DELETE_COMMENT,
);

export const deleteCommentSuccess: DeleteCommentSuccessAction = createAction(
  COMMENT.DELETE_COMMENT_SUCCESS,
);

export const addCommentReaction: AddCommentReactionAction = createAction(
  COMMENT.ADD_COMMENT_REACTION,
);

export const addCommentReactionSuccess: AddCommentReactionSuccessAction = createAction(
  COMMENT.ADD_COMMENT_REACTION_SUCCESS,
);

export const deleteCommentReaction: DeleteCommentReactionAction = createAction(
  COMMENT.DELETE_COMMENT_REACTION,
);

export const deleteCommentReactionSuccess: DeleteCommentReactionSuccessAction = createAction(
  COMMENT.DELETE_COMMENT_REACTION_SUCCESS,
);
