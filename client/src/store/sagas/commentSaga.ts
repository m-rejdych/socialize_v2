import { put, call, takeEvery } from 'redux-saga/effects';

import {
  CreateCommentAction,
  DeleteCommentAciton,
  AddCommentReactionAction,
} from '../../interfaces/comment/commentActions';
import {
  createCommentSuccess,
  deleteCommentSuccess,
  addCommentReactionSuccess,
} from '../actions/commentActions';
import { setPostError } from '../actions/postActions';
import { COMMENT } from '../../shared/constants/actionTypes';
import {
  createComment,
  deleteComment,
  addCommentReaction,
} from '../../services/commentService';
import {
  CreateCommentRes,
  DeleteCommentRes,
} from '../../interfaces/comment/commentRes';

function* handleCreateComment({ payload }: ReturnType<CreateCommentAction>) {
  try {
    const response: CreateCommentRes = yield call(createComment, payload);

    if (response.data) {
      yield put(createCommentSuccess(response.data));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

function* handleDeleteComment({ payload }: ReturnType<DeleteCommentAciton>) {
  try {
    const response: DeleteCommentRes = yield call(deleteComment, payload);

    if (response.data) {
      const { postId, commentId, deleted } = response.data;
      yield put(
        deleted
          ? deleteCommentSuccess({ postId, commentId })
          : setPostError('Comment could not be deleted!'),
      );
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

export function* handleAddCommentReaction({
  payload,
}: ReturnType<AddCommentReactionAction>) {
  try {
    const response: CreateCommentRes = yield call(addCommentReaction, payload);

    if (response.data) {
      yield put(addCommentReactionSuccess(response.data));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

export function* createCommentSaga() {
  yield takeEvery(COMMENT.CREATE_COMMENT, handleCreateComment);
}

export function* deleteCommentSaga() {
  yield takeEvery(COMMENT.DELETE_COMMENT, handleDeleteComment);
}

export function* addCommentReactionSaga() {
  yield takeEvery(COMMENT.ADD_COMMENT_REACTION, handleAddCommentReaction);
}
