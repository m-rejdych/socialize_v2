import { call, put, takeEvery } from 'redux-saga/effects';

import { FRIENDSHIP } from '../../shared/constants/actionTypes';
import { GetAllFriendshipsRes } from '../../interfaces/friendship/friendshipRes';
import {
  getAllFriendshipsSuccess,
  setFriendshipError,
} from '../actions/friendshipActions';
import { getAllFriends } from '../../services/friendshipService';

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

export function* getAllFriendshipsSaga() {
  yield takeEvery(FRIENDSHIP.GET_ALL_FRIENDSHIPS, handleGetAllFriendships);
}
