import Notification from './notification';

export interface GetMyNotificationsRes {
  data?: Notification[];
}

export interface GetNotificationsCountRes {
  data?: number;
}

export interface MarkAsSeenByIdRes {
  data?: Notification;
}
