import Action from '../store/action';
import Notification from './notification';
import { NOTIFICATION } from '../../shared/constants/actionTypes';

export type GetMyNotificationsAction = Action<
  typeof NOTIFICATION.GET_MY_NOTIFICATIONS,
  null
>;

export type GetMyNotificationsSuccessAction = Action<
  typeof NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS,
  Notification[]
>;

export type GetNotSeenNotificationsCountAction = Action<
  typeof NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT,
  null
>;

export type GetNotSeenNotificationsCountSuccessAction = Action<
  typeof NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT_SUCCESS,
  number
>;

export type AddNotificationAction = Action<
  typeof NOTIFICATION.ADD_NOTIFICATION,
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

export type SetNotificationErrorAction = Action<
  typeof NOTIFICATION.ERROR,
  string | null
>;
