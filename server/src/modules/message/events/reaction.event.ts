import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import Message from '../message.entity';

@WebSocketGateway({ namespace: 'chats' })
class ReactionEvent {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('reaction')
  handleReaction(@MessageBody() message: Message): void {
    this.server.to(message.chat.id.toString()).emit('reaction', message);
  }
}

export default ReactionEvent;
