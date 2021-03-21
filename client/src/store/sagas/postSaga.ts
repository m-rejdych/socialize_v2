import { put, call, takeEvery } from 'redux-saga/effects';

import {
  createPostSuccess,
  getFeedSuccess,
  setPostError,
} from '../actions/postActions';
import { CreatePostAction } from '../../interfaces/post/postActions';
import { CreatePostRes, GetFeedRes } from '../../interfaces/post/postRes';
import { createPost, getFeed } from '../../services/postService';
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

function* handleGetFeed() {
  try {
    const response: GetFeedRes = yield call(getFeed);

    if (response.data) {
      yield put(getFeedSuccess(response.data));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

export function* createPostSaga() {
  yield takeEvery(POST.CREATE_POST, handleCreatePost);
}

export function* getFeedSaga() {
  yield takeEvery(POST.GET_FEED, handleGetFeed);
}
