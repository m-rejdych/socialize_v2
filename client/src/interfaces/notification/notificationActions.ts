import Action from '../store/action';
import Notification from './notification';
import { GetNotificationsCountPayload } from './notificationPayloads';
import { NOTIFICATION } from '../../shared/constants/actionTypes';

export type GetMyNotificationsAction = Action<
  typeof NOTIFICATION.GET_MY_NOTIFICATIONS,
  null
>;

export type GetMyNotificationsSuccessAction = Action<
  typeof NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS,
  Notification[]
>;

export type GetNotificationsCountAction = Action<
  typeof NOTIFICATION.GET_NOTIFICATIONS_COUNT,
  null
>;

export type GetNotificationsCountSuccessAction = Action<
  typeof NOTIFICATION.GET_NOTIFICATIONS_COUNT_SUCCESS,
  GetNotificationsCountPayload
>;

export type AddNotificationAction = Action<
  typeof NOTIFICATION.ADD_NOTIFICATION,
  Notification
>;

export type AddNotificationSuccessAction = Action<
  typeof NOTIFICATION.ADD_NOTIFICATION_SUCCESS,
  Notification
>;

export type HideNewNotificationAction = Action<
  typeof NOTIFICATION.HIDE_NEW_NOTIFICATION,
  number
>;

export type ResetNotificationsAction = Action<
  typeof NOTIFICATION.RESET_NOTIFICATIONS,
  null
>;

export type MarkAsSeenByIdAction = Action<
  typeof NOTIFICATION.MARK_AS_SEEN_BY_ID,
  number
>;

export type MarkAsSeenByIdSuccessAction = Action<
  typeof NOTIFICATION.MARK_AS_SEEN_BY_ID_SUCCESS,
  Notification
>;

export type SetSkipAction = Action<typeof NOTIFICATION.SET_SKIP, number>;

export type SetNotificationErrorAction = Action<
  typeof NOTIFICATION.ERROR,
  string | null
>;
