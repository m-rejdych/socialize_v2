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
    socket.join(id.toString(), (err: Error) => {
      if (err) throw new BadGatewayException();
    });
  }

  @SubscribeMessage('leave-rooms')
  handleLeaveRoom(@ConnectedSocket() socket: Socket): void {
    socket.leaveAll();
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.broadcast.to(message.chat.id.toString()).emit('message', message);
  }

  @SubscribeMessage('reaction')
  handleReaction(
    @MessageBody() message: Message,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.broadcast.to(message.chat.id.toString()).emit('reaction', message);
  }

  @SubscribeMessage('reaction-delete')
  handleReactionDelete(
    @MessageBody() { chatId, ...rest }: ReactionDeleteEventDto,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.broadcast.to(chatId.toString()).emit('reaction-delete', rest);
  }
}

export default ChatsGateway;
