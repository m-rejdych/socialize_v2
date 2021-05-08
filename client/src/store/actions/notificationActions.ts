import createAction from '../../util/actionFactory';
import {
  GetMyNotificationsAction,
  GetMyNotificationsSuccessAction,
  GetNotificationsCountAction,
  GetNotificationsCountSuccessAction,
  AddNotificationAction,
  AddNotificationSuccessAction,
  HideNewNotificationAction,
  MarkAsSeenByIdAction,
  MarkAsSeenByIdSuccessAction,
  SetNotificationErrorAction,
  SetSkipAction,
  ResetNotificationsAction,
} from '../../interfaces/notification/notificationActions';
import { NOTIFICATION } from '../../shared/constants/actionTypes';

export const getMyNotifications: GetMyNotificationsAction = createAction(
  NOTIFICATION.GET_MY_NOTIFICATIONS,
);

export const getMyNotificationsSuccess: GetMyNotificationsSuccessAction = createAction(
  NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS,
);

export const getNotificationsCount: GetNotificationsCountAction = createAction(
  NOTIFICATION.GET_NOTIFICATIONS_COUNT,
);

export const getNotificationsCountSuccess: GetNotificationsCountSuccessAction = createAction(
  NOTIFICATION.GET_NOTIFICATIONS_COUNT_SUCCESS,
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

export const resetNotifications: ResetNotificationsAction = createAction(
  NOTIFICATION.RESET_NOTIFICATIONS,
);

export const setSkip: SetSkipAction = createAction(NOTIFICATION.SET_SKIP);

export const setNotificationsError: SetNotificationErrorAction = createAction(
  NOTIFICATION.ERROR,
);
