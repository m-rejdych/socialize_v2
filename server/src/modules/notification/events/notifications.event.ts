import { BadGatewayException } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import NotificationService from '../notification.service';
import CreateNotificationDto from '../dto/createNotification.dto';

@WebSocketGateway({ namespace: 'notifications' })
class NotificationsGateway {
  constructor(private notificationService: NotificationService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('join-notifications')
  handleJoinNotifications(
    @MessageBody() userId: number,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.join(userId.toString(), (err) => {
      if (err) throw new BadGatewayException();
    });
  }

  @SubscribeMessage('leave-notifications')
  handleLeaveNotifications(@ConnectedSocket() socket: Socket): void {
    socket.leaveAll();
  }

  async sendNotification(data: CreateNotificationDto): Promise<void> {
    const notification = await this.notificationService.createNotification(
      data,
    );

    this.server
      .to(notification.user.id.toString())
      .emit('notification', notification);
  }
}

export default NotificationsGateway;
