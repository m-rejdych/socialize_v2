import Notification from './notification';

export interface GetMyNotificationsRes {
  data?: Notification[];
}

export interface GetNotSeenNotificationsCountRes {
  data?: number;
}

export interface MarkAsSeenByIdRes {
  data?: Notification;
}
