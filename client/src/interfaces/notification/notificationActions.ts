import Action from '../store/action';
import Notification from './notification';
import { NOTIFICATION } from '../../shared/constants/actionTypes';
import { GetMyNotificationsReq } from './notificationReq';

export type GetMyNotificationsAction = Action<
  typeof NOTIFICATION.GET_MY_NOTIFICATIONS,
  GetMyNotificationsReq | null
>;

export type GetMyNotificationsSuccessAction = Action<
  typeof NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS,
  Notification[]
>;

export type SetNotificationErrorAction = Action<
  typeof NOTIFICATION.ERROR,
  string | null
>;
