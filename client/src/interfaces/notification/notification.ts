import NotificationType from '../notificationType';
import User from '../user';

export default interface Notification {
  id: number;
  seen: boolean;
  targetId: number;
  createdAt: Date;
  updatedAt: Date;
  type: NotificationType;
  user?: User;
  sender: User;
}
