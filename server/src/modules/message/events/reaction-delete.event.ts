import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import ReactionDeleteEventDto from '../dto/reactionDeleteEvent.dto';

@WebSocketGateway({ namespace: 'chats' })
class ReactionDeleteGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('reaction-delete')
  handleReactionDelete(
    @MessageBody() { chatId, ...rest }: ReactionDeleteEventDto,
  ): void {
    this.server.to(chatId.toString()).emit('reaction-delete', rest);
  }
}

export default ReactionDeleteGateway;
