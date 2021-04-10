import { NotificationName } from '../../../../interfaces/notificationType/notificationType';
import ROUTES from '../../../constants/routes';

const NOTIFICATION_ROUTES: Record<NotificationName, string> = {
  comment: `${ROUTES.POST}`,
  commentReaction: `${ROUTES.POST}`,
  postReaction: `${ROUTES.POST}`,
  message: `${ROUTES.CHAT}`,
  messageReaction: `${ROUTES.CHAT}`,
  friendshipRequest: `${ROUTES.PROFILE}`,
  friendshipAccept: `${ROUTES.PROFILE}`,
} as const;

export default NOTIFICATION_ROUTES;
