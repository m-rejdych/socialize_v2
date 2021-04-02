import { put, call, takeEvery } from 'redux-saga/effects';

import { PROFILE } from '../../shared/constants/actionTypes';
import {
  GetUserInfoAction,
  UpdateUserInfoAction,
} from '../../interfaces/profile/profileActions';
import {
  getUserInfoSuccess,
  updateUserInfoSuccess,
  setProfileError,
} from '../actions/profileActions';
import { ProfileRes } from '../../interfaces/profile/profileRes';
import { getUserInfo, updateUserInfo } from '../../services/userInfoService';

function* handleGetUserInfo({ payload }: ReturnType<GetUserInfoAction>) {
  try {
    const response: ProfileRes = yield call(getUserInfo, payload);

    if (response.data) {
      yield put(getUserInfoSuccess(response.data));
    }
  } catch (error) {
    yield put(setProfileError(error.response.data.message));
  }
}

function* handleUpdateUserInfo({ payload }: ReturnType<UpdateUserInfoAction>) {
  try {
    const response: ProfileRes = yield call(updateUserInfo, payload);

    if (response.data) {
      yield put(updateUserInfoSuccess(response.data));
    }
  } catch (error) {
    yield put(setProfileError(error.response.data.message));
  }
}

export function* getUserInfoSaga() {
  yield takeEvery(PROFILE.GET_USER_INFO, handleGetUserInfo);
}

export function* updateUserInfoSaga() {
  yield takeEvery(PROFILE.UPDATE_USER_INFO, handleUpdateUserInfo);
}
