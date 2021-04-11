import { put, call, takeEvery } from 'redux-saga/effects';

import {
  createPostSuccess,
  getFeedSuccess,
  getSelectedPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
  deletePostReactionSuccess,
  setPostError,
} from '../actions/postActions';
import {
  CreatePostAction,
  UpdatePostAction,
  DeletePostAction,
  GetSelectedPostAction,
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
  getPost,
  updatePost,
  deletePost,
  addPostReaction,
  deletePostReaction,
} from '../../services/postService';
import { POST } from '../../shared/constants/actionTypes';
import handleError from '../../util/errorHandler';

function* handleCreatePost({ payload }: ReturnType<CreatePostAction>) {
  try {
    const response: CreatePostRes = yield call(createPost, payload);

    if (response.data) {
      yield put(createPostSuccess(response.data));
    }
  } catch (error) {
    yield put(handleError(setPostError, error));
  }
}

function* handleGetFeed() {
  try {
    const response: GetFeedRes = yield call(getFeed);

    if (response.data) {
      yield put(getFeedSuccess(response.data));
    }
  } catch (error) {
    yield put(handleError(setPostError, error));
  }
}

function* handleGetSelectedPost({
  payload,
}: ReturnType<GetSelectedPostAction>) {
  try {
    const response: CreatePostRes = yield call(getPost, payload);

    yield put(getSelectedPostSuccess(response.data || null));
  } catch (error) {
    yield put(handleError(setPostError, error));
  }
}

function* handleUpdatePost({ payload }: ReturnType<UpdatePostAction>) {
  try {
    const response: CreatePostRes = yield call(updatePost, payload);

    if (response.data) {
      yield put(updatePostSuccess(response.data));
    }
  } catch (error) {
    yield put(handleError(setPostError, error));
  }
}

function* handleDeletePost({ payload }: ReturnType<DeletePostAction>) {
  try {
    const response: DeletePostRes = yield call(deletePost, payload);

    if (response.data) {
      yield put(deletePostSuccess(response.data.postId));
    }
  } catch (error) {
    yield put(handleError(setPostError, error));
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
    yield put(handleError(setPostError, error));
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
    yield put(handleError(setPostError, error));
  }
}

export function* createPostSaga() {
  yield takeEvery(POST.CREATE_POST, handleCreatePost);
}

export function* getFeedSaga() {
  yield takeEvery(POST.GET_FEED, handleGetFeed);
}

export function* getSelectedPostSaga() {
  yield takeEvery(POST.GET_SELECTED_POST, handleGetSelectedPost);
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
