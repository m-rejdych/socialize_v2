import { put, call, fork, takeEvery, select } from 'redux-saga/effects';

import {
  getMyNotifications,
  getNotSeenNotificationsCount,
  markAllAsSeen,
  markAsSeenById,
} from '../../services/notificationService';
import {
  GetMyNotificationsRes,
  GetNotSeenNotificationsCountRes,
  MarkAsSeenByIdRes,
} from '../../interfaces/notification/notificationRes';
import {
  MarkAsSeenByIdAction,
  AddNotificationAction,
} from '../../interfaces/notification/notificationActions';
import {
  getMyNotificationsSuccess,
  getNotSeenNotificationsCountSuccess,
  markAsSeenByIdSuccess,
  addNotificationSuccess,
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

function* handleAddNotification({
  payload,
}: ReturnType<AddNotificationAction>) {
  try {
    const chatId: number | undefined = yield select(
      (state: RootState) => state.chat.selectedChat?.chat.id,
    );

    if (
      (payload.type.name === 'message' ||
        payload.type.name === 'messageReaction') &&
      payload.targetId === chatId
    ) {
      yield fork(markAsSeenById, { notificationId: payload.id });
    } else {
      yield put(addNotificationSuccess(payload));
    }
  } catch (error) {
    yield put(handleError(setNotificationsError, error));
  }
}

function* handleMarkAsSeenById({ payload }: ReturnType<MarkAsSeenByIdAction>) {
  try {
    const response: MarkAsSeenByIdRes = yield call(markAsSeenById, {
      notificationId: payload,
    });

    if (response.data) {
      yield put(markAsSeenByIdSuccess(response.data));
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

export function* addNotificationSaga() {
  yield takeEvery(NOTIFICATION.ADD_NOTIFICATION, handleAddNotification);
}

export function* markAsSeenByIdSaga() {
  yield takeEvery(NOTIFICATION.MARK_AS_SEEN_BY_ID, handleMarkAsSeenById);
}
