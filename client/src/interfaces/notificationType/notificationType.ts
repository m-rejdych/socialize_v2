export type NotificationName =
  | 'message'
  | 'messageReaction'
  | 'postReaction'
  | 'comment'
  | 'commentReaction'
  | 'friendshipRequest'
  | 'friendshipAccept';

export default interface NotificationType {
  id: number;
  name: NotificationName;
}
