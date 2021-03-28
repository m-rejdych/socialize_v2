import createAction from '../../util/actionFactory';
import {
  CreateCommentAction,
  CreateCommentSuccessAction,
  DeleteCommentAciton,
  DeleteCommentSuccessAction,
} from '../../interfaces/comment/commentActions';
import { COMMENT } from '../../shared/constants/actionTypes';

export const createComment: CreateCommentAction = createAction(
  COMMENT.CREATE_COMMENT,
);

export const createCommentSuccess: CreateCommentSuccessAction = createAction(
  COMMENT.CREATE_COMMENT_SUCCESS,
);

export const deleteComment: DeleteCommentAciton = createAction(
  COMMENT.DELETE_COMMENT,
);

export const deleteCommentSuccess: DeleteCommentSuccessAction = createAction(
  COMMENT.DELETE_COMMENT_SUCCESS,
);
