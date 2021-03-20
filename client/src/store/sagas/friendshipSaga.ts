import { call, put, takeEvery } from 'redux-saga/effects';

import { FRIENDSHIP } from '../../shared/constants/actionTypes';
import {
  GetAllFriendshipsRes,
  GetFriendshipRes,
  CreateFriendshipRes,
  AcceptFriendshipRes,
  DeleteFriendshipRes,
} from '../../interfaces/friendship/friendshipRes';
import {
  GetFriendshipAction,
  CreateFriendshipAction,
  AcceptFriendshipAction,
  DeleteFriendshipAction,
} from '../../interfaces/friendship/friendshipActions';
import {
  getAllFriendshipsSuccess,
  getFriendshipSuccess,
  createFriendshipSuccess,
  acceptFriendshipSuccess,
  deleteFriendshipSuccess,
  setFriendshipError,
} from '../actions/friendshipActions';
import {
  getAllFriends,
  getFriendship,
  createFriendship,
  acceptFriendship,
  deleteFriendship,
} from '../../services/friendshipService';

function* handleGetAllFriendships() {
  try {
    const response: GetAllFriendshipsRes = yield call(getAllFriends);

    if (response.data) {
      yield put(getAllFriendshipsSuccess(response.data));
    }
  } catch (error) {
    yield put(setFriendshipError(error.response.data.message));
  }
}

function* handleGetFriendship({ payload }: ReturnType<GetFriendshipAction>) {
  try {
    const response: GetFriendshipRes = yield call(getFriendship, payload);

    yield put(getFriendshipSuccess(response.data || null));
  } catch (error) {
    yield put(setFriendshipError(error.response.data.message));
  }
}

function* handleCreateFriendship({
  payload,
}: ReturnType<CreateFriendshipAction>) {
  try {
    const response: CreateFriendshipRes = yield call(createFriendship, payload);

    if (response.data) {
      yield put(createFriendshipSuccess(response.data));
    }
  } catch (error) {
    yield put(setFriendshipError(error.response.data.message));
  }
}

export function* handleAcceptFriendship({
  payload,
}: ReturnType<AcceptFriendshipAction>) {
  try {
    const response: AcceptFriendshipRes = yield call(acceptFriendship, payload);

    if (response.data) {
      const { friendship } = response.data;

      yield put(acceptFriendshipSuccess(friendship));
    }
  } catch (error) {
    yield put(setFriendshipError(error.response.data.message));
  }
}

export function* handleDeleteFriendship({
  payload,
}: ReturnType<DeleteFriendshipAction>) {
  try {
    const response: DeleteFriendshipRes = yield call(deleteFriendship, payload);

    if (response.data) {
      const { deleted, friendId } = response.data;

      yield put(
        deleted
          ? deleteFriendshipSuccess(friendId)
          : setFriendshipError('Friendship could not be deleted'),
      );
    }
  } catch (error) {
    yield put(setFriendshipError(error.response.data.message));
  }
}

export function* getAllFriendshipsSaga() {
  yield takeEvery(FRIENDSHIP.GET_ALL_FRIENDSHIPS, handleGetAllFriendships);
}

export function* getFriendshipSaga() {
  yield takeEvery(FRIENDSHIP.GET_FRIENDSHIP, handleGetFriendship);
}

export function* createFriendshipSaga() {
  yield takeEvery(FRIENDSHIP.CREATE_FRIENDSHIP, handleCreateFriendship);
}

export function* acceptFriendshipSaga() {
  yield takeEvery(FRIENDSHIP.ACCEPT_FRIENDSHIP, handleAcceptFriendship);
}

export function* deleteFriendshipSaga() {
  yield takeEvery(FRIENDSHIP.DELETE_FRIENDSHIP, handleDeleteFriendship);
}
