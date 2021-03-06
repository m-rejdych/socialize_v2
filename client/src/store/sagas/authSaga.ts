import { put, call, takeEvery } from 'redux-saga/effects';

import { AUTH } from '../../shared/constants/actionTypes';
import { setUserError, getUserSuccess } from '../actions/userActions';
import { getUser } from '../../services/userService';
import { register, login } from '../../services/authService';
import { RegisterAction, LoginAction } from '../../interfaces/auth/authActions';
import { AuthResponse } from '../../interfaces/auth/responses';
import { GetUserRes } from '../../interfaces/user/userRes';

function* handleRegister({ payload }: ReturnType<RegisterAction>) {
  try {
    const authResponse: AuthResponse = yield call(register, payload);

    if (authResponse.data) {
      const { userId, token } = authResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem(
        'expiresIn',
        new Date(Date.now()).setHours(new Date().getHours() + 1).toString(),
      );

      const userResponse: GetUserRes = yield call(getUser, { userId, token });

      if (userResponse.data) {
        yield put(getUserSuccess(userResponse.data));
      }
    }
  } catch (error) {
    yield put(setUserError(error.message));
  }
}

function* handleLogin({ payload }: ReturnType<LoginAction>) {
  try {
    const authResponse: AuthResponse = yield call(login, payload);

    if (authResponse.data) {
      const { userId, token } = authResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem(
        'expiresIn',
        new Date(Date.now()).setHours(new Date().getHours() + 1).toString(),
      );

      const userResponse: GetUserRes = yield call(getUser, { userId, token });

      if (userResponse.data) {
        yield put(getUserSuccess(userResponse.data));
      }
    }
  } catch (error) {
    yield put(setUserError(error.message));
  }
}

export function* registerSaga() {
  yield takeEvery(AUTH.REGISTER, handleRegister);
}

export function* loginSaga() {
  yield takeEvery(AUTH.LOGIN, handleLogin);
}
