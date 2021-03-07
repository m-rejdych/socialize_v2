import { put, call, takeEvery } from 'redux-saga/effects';

import { AUTH } from '../../shared/constants/actionTypes';
import { setUserError, getUserSuccess } from '../actions/userActions';
import { getUser, getMe } from '../../services/userService';
import { register, login } from '../../services/authService';
import { RegisterAction, LoginAction } from '../../interfaces/auth/authActions';
import { AuthResponse } from '../../interfaces/auth/authRes';
import { GetUserRes } from '../../interfaces/user/userRes';

function* handleRegister({ payload }: ReturnType<RegisterAction>) {
  try {
    const authResponse: AuthResponse = yield call(register, payload);

    if (authResponse.data) {
      const { userId, token } = authResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem(
        'expiresIn',
        new Date().setHours(new Date().getHours() + 1).toString(),
      );

      const userResponse: GetUserRes = yield call(getUser, { userId });

      if (userResponse.data) {
        yield put(getUserSuccess(userResponse.data));
      }
    }
  } catch (error) {
    yield put(setUserError(error.response.data.message));
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
        new Date().setHours(new Date().getHours() + 1).toString(),
      );

      const userResponse: GetUserRes = yield call(getUser, { userId });

      if (userResponse.data) {
        yield put(getUserSuccess(userResponse.data));
      }
    }
  } catch (error) {
    yield put(setUserError(error.response.data.message));
  }
}

function* handleAutoLogin() {
  try {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {
      localStorage.clear();
      yield put(
        getUserSuccess({ email: '', lastName: '', firstName: '', id: 0 }),
      );
    } else {
      if (Number(expiresIn) < Date.now()) {
        localStorage.clear();
        yield put(
          getUserSuccess({ email: '', lastName: '', firstName: '', id: 0 }),
        );
      } else {
        const response: GetUserRes = yield call(getMe);

        if (response.data) {
          yield put(getUserSuccess(response.data));
        }
      }
    }
  } catch (error) {
    yield put(setUserError(error.response.data.message));
  }
}

export function* registerSaga() {
  yield takeEvery(AUTH.REGISTER, handleRegister);
}

export function* loginSaga() {
  yield takeEvery(AUTH.LOGIN, handleLogin);
}

export function* autoLoginSaga() {
  yield takeEvery(AUTH.AUTO_LOGIN, handleAutoLogin);
}
