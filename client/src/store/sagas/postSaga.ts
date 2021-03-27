import { put, call, takeEvery } from 'redux-saga/effects';

import {
  createPostSuccess,
  getFeedSuccess,
  updatePostSuccess,
  deletePostSuccess,
  deletePostReactionSuccess,
  setPostError,
} from '../actions/postActions';
import {
  CreatePostAction,
  UpdatePostAction,
  DeletePostAction,
  AddPostReactionAction,
  DeletePostReactionAction,
} from '../../interfaces/post/postActions';
import {
  CreatePostRes,
  GetFeedRes,
  DeletePostRes,
  DeletePostReactionRes,
} from '../../interfaces/post/postRes';
import {
  createPost,
  getFeed,
  updatePost,
  deletePost,
  addPostReaction,
  deletePostReaction,
} from '../../services/postService';
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

function* handleUpdatePost({ payload }: ReturnType<UpdatePostAction>) {
  try {
    const response: CreatePostRes = yield call(updatePost, payload);

    if (response.data) {
      yield put(updatePostSuccess(response.data));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

function* handleDeletePost({ payload }: ReturnType<DeletePostAction>) {
  try {
    const response: DeletePostRes = yield call(deletePost, payload);

    if (response.data) {
      yield put(deletePostSuccess(response.data.postId));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

function* handleAddPostReaction({
  payload,
}: ReturnType<AddPostReactionAction>) {
  try {
    const response: CreatePostRes = yield call(addPostReaction, payload);

    if (response.data) {
      yield put(updatePostSuccess(response.data));
    }
  } catch (error) {
    yield put(setPostError(error.response.data.message));
  }
}

export function* handleDeletePostReaction({
  payload,
}: ReturnType<DeletePostReactionAction>) {
  try {
    const response: DeletePostReactionRes = yield call(
      deletePostReaction,
      payload,
    );

    if (response.data) {
      const { reactionId, postId, deleted } = response.data;

      yield put(
        deleted
          ? deletePostReactionSuccess({ postId, reactionId })
          : setPostError('Reaction could not be deleted!'),
      );
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

export function* updatePostSaga() {
  yield takeEvery(POST.UPDATE_POST, handleUpdatePost);
}

export function* deletePostSaga() {
  yield takeEvery(POST.DELETE_POST, handleDeletePost);
}

export function* addPostReactionSaga() {
  yield takeEvery(POST.ADD_POST_REACTION, handleAddPostReaction);
}

export function* deletePostReactionSaga() {
  yield takeEvery(POST.DELETE_POST_REACTION, handleDeletePostReaction);
}
