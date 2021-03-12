import { all } from 'redux-saga/effects';

import { registerSaga, loginSaga, autoLoginSaga } from './authSaga';
import { getUserSaga } from './userSaga';
import { getUserInfoSaga } from './profileSaga';

export default function* rootSaga() {
  yield all([
    registerSaga(),
    loginSaga(),
    autoLoginSaga(),
    getUserSaga(),
    getUserInfoSaga(),
  ]);
}
