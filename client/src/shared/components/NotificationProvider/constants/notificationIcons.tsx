import { ThumbUpAlt, ChatBubble, GroupAdd } from '@material-ui/icons';

import { NotificationName } from '../../../../interfaces/notificationType/notificationType';

const NOTIFICATION_ICONS: Record<NotificationName, JSX.Element> = {
  commentReaction: <ThumbUpAlt />,
  postReaction: <ThumbUpAlt />,
  messageReaction: <ThumbUpAlt />,
  message: <ChatBubble />,
  comment: <ChatBubble />,
  friendshipAccept: <GroupAdd />,
  friendshipRequest: <GroupAdd />,
} as const;

export default NOTIFICATION_ICONS;
