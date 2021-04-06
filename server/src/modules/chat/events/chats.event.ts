import { BadGatewayException } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import Message from '../../message/message.entity';
import ReactionDeleteEventDto from '../dto/reactionDeleteEvent.dto';

@WebSocketGateway({ namespace: 'chats' })
class ChatsGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() id: number,
    @ConnectedSocket() socket: Socket,
  ): void {
    console.log('rooms befoer', socket.rooms);
    socket.join(id.toString(), (err: Error) => {
      if (err) throw new BadGatewayException();
    });
  }

  @SubscribeMessage('leave-rooms')
  handleLeaveRoom(@ConnectedSocket() socket: Socket): void {
    socket.leaveAll();
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message): void {
    this.server.to(message.chat.id.toString()).emit('message', message);
  }

  @SubscribeMessage('reaction')
  handleReaction(@MessageBody() message: Message): void {
    this.server.to(message.chat.id.toString()).emit('reaction', message);
  }

  @SubscribeMessage('reaction-delete')
  handleReactionDelete(
    @MessageBody() { chatId, ...rest }: ReactionDeleteEventDto,
  ): void {
    this.server.to(chatId.toString()).emit('reaction-delete', rest);
  }
}

export default ChatsGateway;
