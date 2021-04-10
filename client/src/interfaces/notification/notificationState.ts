import Notification from './notification';

export default interface NotificationState {
  notifications: Notification[];
  notSeenNotificationsCount: number;
  skip: number;
  loading: boolean;
  notificationsLoading: boolean;
  error: string | null;
}
