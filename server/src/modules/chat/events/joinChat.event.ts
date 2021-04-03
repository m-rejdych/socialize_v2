import { BadGatewayException } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chats' })
class JoinChatEvent {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('join-chat')
  handleJoinChat(@MessageBody() id: number): void {
    this.server.on('connection', (socket) => {
      socket.join(id.toString(), (err: Error) => {
        if (err) throw new BadGatewayException(err);
      });
    });
  }
}

export default JoinChatEvent;
