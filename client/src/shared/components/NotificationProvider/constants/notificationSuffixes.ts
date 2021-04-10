import { NotificationName } from '../../../../interfaces/notificationType/notificationType';

const NOTIFICATION_SUFFIXES: Record<NotificationName, string> = {
  comment: 'commented on your post.',
  commentReaction: 'reacted to your comment.',
  friendshipAccept: 'accepted your friend request.',
  friendshipRequest: 'sent you a friend request.',
  message: 'sent you a message.',
  messageReaction: 'reacted to your message.',
  postReaction: 'reacted to your post.',
} as const;

export default NOTIFICATION_SUFFIXES;
