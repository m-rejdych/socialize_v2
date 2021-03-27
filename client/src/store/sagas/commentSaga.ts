import { put, call, takeEvery } from 'redux-saga/effects';

import { CreateCommentAction } from '../../interfaces/comment/commentActions';
import { createCommentSuccess } from '../actions/commentActions';
import { setPostError } from '../actions/postActions';
import { COMMENT } from '../../shared/constants/actionTypes';
import { createComment } from '../../services/commentService';
import { CreateCommentRes } from '../../interfaces/comment/commentRes';

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

export function* createCommentSaga() {
  yield takeEvery(COMMENT.CREATE_COMMENT, handleCreateComment);
}
