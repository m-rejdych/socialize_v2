import { put, call, fork, takeEvery, select } from 'redux-saga/effects';

import {
  getMyNotifications,
  getNotSeenNotificationsCount,
  markAllAsSeen,
} from '../../services/notificationService';
import {
  GetMyNotificationsRes,
  GetNotSeenNotificationsCountRes,
} from '../../interfaces/notification/notificationRes';
import {
  getMyNotificationsSuccess,
  getNotSeenNotificationsCountSuccess,
  setNotificationsError,
} from '../actions/notificationActions';
import { NOTIFICATION } from '../../shared/constants/actionTypes';
import handleError from '../../util/errorHandler';
import RootState from '../../interfaces/store';

const TAKE = 20;

function* handleGetMyNotifications() {
  try {
    const skip: number = yield select(
      (state: RootState) => state.notification.skip,
    );

    const response: GetMyNotificationsRes = yield call(getMyNotifications, {
      take: TAKE,
      skip,
    });

    if (response.data) {
      yield fork(markAllAsSeen);
      yield put(getMyNotificationsSuccess(response.data));
    }
  } catch (error) {
    yield put(handleError(setNotificationsError, error));
  }
}

function* handleGetNotSeenNotificationsCount() {
  try {
    const response: GetNotSeenNotificationsCountRes = yield call(
      getNotSeenNotificationsCount,
    );

    if (response.data) {
      yield put(getNotSeenNotificationsCountSuccess(response.data));
    }
  } catch (error) {
    yield put(handleError(setNotificationsError, error));
  }
}

export function* getMyNotificationsSaga() {
  yield takeEvery(NOTIFICATION.GET_MY_NOTIFICATIONS, handleGetMyNotifications);
}

export function* getNotSeenNotificationsCountSaga() {
  yield takeEvery(
    NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT,
    handleGetNotSeenNotificationsCount,
  );
}
