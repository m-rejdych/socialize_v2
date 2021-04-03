import { BadGatewayException } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chats' })
class LeaveChatEvent {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('leave-chat')
  handleLeaveChat(@MessageBody() id: number): void {
    this.server.on('connection', (socket) => {
      socket.leave(id.toString(), (err: Error) => {
        if (err) throw new BadGatewayException(err);
      });
    });
  }
}

export default LeaveChatEvent;
