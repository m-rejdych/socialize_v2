export interface GetMyNotificationsReq {
  take?: number;
  skip?: number;
}

export interface MarkAsSeenByIdReq {
  notificationId: number;
}
