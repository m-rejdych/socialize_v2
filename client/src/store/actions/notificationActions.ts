import createAction from '../../util/actionFactory';
import {
  GetMyNotificationsAction,
  GetMyNotificationsSuccessAction,
  GetNotSeenNotificationsCountAction,
  GetNotSeenNotificationsCountSuccessAction,
  SetNotificationErrorAction,
} from '../../interfaces/notification/notificationActions';
import { NOTIFICATION } from '../../shared/constants/actionTypes';

export const getMyNotifications: GetMyNotificationsAction = createAction(
  NOTIFICATION.GET_MY_NOTIFICATIONS,
);

export const getMyNotificationsSuccess: GetMyNotificationsSuccessAction = createAction(
  NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS,
);

export const getNotSeenNotificationsCount: GetNotSeenNotificationsCountAction = createAction(
  NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT,
);

export const getNotSeenNotificationsCountSuccess: GetNotSeenNotificationsCountSuccessAction = createAction(
  NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT_SUCCESS,
);

export const setNotificationsError: SetNotificationErrorAction = createAction(
  NOTIFICATION.ERROR,
);
