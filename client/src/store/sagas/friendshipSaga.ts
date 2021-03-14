import { call, put, takeEvery } from 'redux-saga/effects';

import { FRIENDSHIP } from '../../shared/constants/actionTypes';
import {
  GetAllFriendshipsRes,
  GetFriendshipRes,
} from '../../interfaces/friendship/friendshipRes';
import { GetFriendshipAction } from '../../interfaces/friendship/friendshipActions';
import {
  getAllFriendshipsSuccess,
  getFriendshipSuccess,
  setFriendshipError,
} from '../actions/friendshipActions';
import { getAllFriends, getFriendship } from '../../services/friendshipService';

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

export function* getAllFriendshipsSaga() {
  yield takeEvery(FRIENDSHIP.GET_ALL_FRIENDSHIPS, handleGetAllFriendships);
}

export function* getFriendshipSaga() {
  yield takeEvery(FRIENDSHIP.GET_FRIENDSHIP, handleGetFriendship);
}
