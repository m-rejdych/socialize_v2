import createAction from '../../util/actionFactory';
import {
  CreateCommentAction,
  CreateCommentSuccessAction,
} from '../../interfaces/comment/commentActions';
import { COMMENT } from '../../shared/constants/actionTypes';

export const createComment: CreateCommentAction = createAction(
  COMMENT.CREATE_COMMENT,
);

export const createCommentSuccess: CreateCommentSuccessAction = createAction(
  COMMENT.CREATE_COMMENT_SUCCESS,
);
