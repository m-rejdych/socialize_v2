import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import Message from '../message.entity';

@WebSocketGateway({ namespace: 'chats' })
class MessageGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message): void {
    this.server.to(message.chat.id.toString()).emit('message', message);
  }
}

export default MessageGateway;
