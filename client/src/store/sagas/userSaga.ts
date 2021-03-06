import { put, takeEvery } from 'redux-saga/effects';

import { USER } from '../../shared/constants/actionTypes';
import { GetUserAction } from '../../interfaces/user/userActions';
import { setUserError } from '../actions/userActions';
// import { GetUserRes } from '../../interfaces/user/userRes';
// import { getUser } from '../../services/userService';

function* handleGetUser({ payload }: ReturnType<GetUserAction>) {
  try {
    // const { userId } = payload;
    // const response: GetUserRes = yield call(getUser, { userId });
    // console.log(response);
    // yield put(getUserSuccess(response));
  } catch (error) {
    yield put(setUserError(error.message));
  }
}

export function* getUserSaga() {
  yield takeEvery(USER.GET_USER, handleGetUser);
}
