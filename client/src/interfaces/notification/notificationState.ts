import Notification from './notification';

export default interface NotificationState {
  open: boolean;
  notifications: Notification[] | null;
  newNotifications: number[] | null;
  notificationsCount: number;
  notSeenNotificationsCount: number;
  skip: number;
  loading: boolean;
  notificationsLoading: boolean;
  error: string | null;
}
