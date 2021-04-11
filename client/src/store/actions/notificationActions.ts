import createAction from '../../util/actionFactory';
import {
  GetMyNotificationsAction,
  GetMyNotificationsSuccessAction,
  GetNotSeenNotificationsCountAction,
  GetNotSeenNotificationsCountSuccessAction,
  AddNotificationAction,
  AddNotificationSuccessAction,
  HideNewNotificationAction,
  MarkAsSeenByIdAction,
  MarkAsSeenByIdSuccessAction,
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

export const addNotification: AddNotificationAction = createAction(
  NOTIFICATION.ADD_NOTIFICATION,
);

export const addNotificationSuccess: AddNotificationSuccessAction = createAction(
  NOTIFICATION.ADD_NOTIFICATION_SUCCESS,
);

export const hideNewNotification: HideNewNotificationAction = createAction(
  NOTIFICATION.HIDE_NEW_NOTIFICATION,
);

export const markAsSeenById: MarkAsSeenByIdAction = createAction(
  NOTIFICATION.MARK_AS_SEEN_BY_ID,
);

export const markAsSeenByIdSuccess: MarkAsSeenByIdSuccessAction = createAction(
  NOTIFICATION.MARK_AS_SEEN_BY_ID_SUCCESS,
);

export const setNotificationsError: SetNotificationErrorAction = createAction(
  NOTIFICATION.ERROR,
);
