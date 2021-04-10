import Notification from './notification';

export default interface NotificationState {
  open: boolean;
  notifications: Notification[] | null;
  newNotifications: number[] | null;
  notSeenNotificationsCount: number;
  skip: number;
  loading: boolean;
  notificationsLoading: boolean;
  error: string | null;
}
