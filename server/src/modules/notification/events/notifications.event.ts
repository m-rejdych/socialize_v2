import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import Notification from '../notification.entity';

@WebSocketGateway({ namespace: 'notifications' })
class NotificationsGateway {
  @WebSocketServer()
  private server: Server;

  sendNotification(notification: Notification): void {
    this.server
      .to(notification.user.id.toString())
      .emit('notification', notification);
  }
}

export default NotificationsGateway;
