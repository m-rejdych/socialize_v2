import { put, call, takeEvery } from 'redux-saga/effects';

import { PROFILE } from '../../shared/constants/actionTypes';
import { GetUserInfoAction } from '../../interfaces/profile/profileActions';
import { getUserInfoSuccess, setProfileError } from '../actions/profileActions';
import { GetProfileRes } from '../../interfaces/profile/profileRes';
import { getUserInfo } from '../../services/userInfoService';

function* handleGetUserInfo({ payload }: ReturnType<GetUserInfoAction>) {
  try {
    const response: GetProfileRes = yield call(getUserInfo, payload);

    if (response.data) {
      yield put(getUserInfoSuccess(response.data));
    }
  } catch (error) {
    yield put(setProfileError(error.response.data.message));
  }
}

export function* getUserInfoSaga() {
  yield takeEvery(PROFILE.GET_USER_INFO, handleGetUserInfo);
}
