import { put, call, takeEvery } from 'redux-saga/effects';

import { createPostSuccess, setPostError } from '../actions/postActions';
import { CreatePostAction } from '../../interfaces/post/postActions';
import { CreatePostRes } from '../../interfaces/post/postRes';
import { createPost } from '../../services/postService';
import { POST } from '../../shared/constants/actionTypes';

function* handleCreatePost({ payload }: ReturnType<CreatePostAction>) {
  try {
    const response: CreatePostRes = yield call(createPost, payload);

    if (response.data) {
      yield put(createPostSuccess(response.data));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

export function* createPostSaga() {
  yield takeEvery(POST.CREATE_POST, handleCreatePost);
}
