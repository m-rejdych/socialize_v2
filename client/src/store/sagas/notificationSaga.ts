import { put, call, fork, takeEvery, select } from 'redux-saga/effects';

import {
  getMyNotifications,
  getNotificationsCount,
  getNotSeenNotificationsCount,
  markAllAsSeen,
  markAsSeenById,
} from '../../services/notificationService';
import {
  GetMyNotificationsRes,
  GetNotificationsCountRes,
  MarkAsSeenByIdRes,
} from '../../interfaces/notification/notificationRes';
import {
  MarkAsSeenByIdAction,
  AddNotificationAction,
} from '../../interfaces/notification/notificationActions';
import { GetNotificationsCountPayload } from '../../interfaces/notification/notificationPayloads';
import {
  getMyNotificationsSuccess,
  getNotificationsCountSuccess,
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

function* handleGetNotificationsCount() {
  try {
    const data: GetNotificationsCountPayload = {
      notificationsCount: 0,
      notSeenNotificationsCount: 0,
    };

    const notSeenNotificationsResponse: GetNotificationsCountRes = yield call(
      getNotSeenNotificationsCount,
    );
    const notificationsResponse: GetNotificationsCountRes = yield call(
      getNotificationsCount,
    );

    if (notSeenNotificationsResponse.data) {
      data.notSeenNotificationsCount = notSeenNotificationsResponse.data;
    }
    if (notificationsResponse.data) {
      data.notificationsCount = notificationsResponse.data;
    }

    yield put(getNotificationsCountSuccess(data));
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
    NOTIFICATION.GET_NOTIFICATIONS_COUNT,
    handleGetNotificationsCount,
  );
}

export function* addNotificationSaga() {
  yield takeEvery(NOTIFICATION.ADD_NOTIFICATION, handleAddNotification);
}

export function* markAsSeenByIdSaga() {
  yield takeEvery(NOTIFICATION.MARK_AS_SEEN_BY_ID, handleMarkAsSeenById);
}
