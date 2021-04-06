import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Chat from './chat.entity';
import ChatType from '../chatType/chatType.entity';
import User from '../user/user.entity';
import Message from '../message/message.entity';
import ChatTypeModule from '../chatType/chatType.module';
import UserModule from '../user/user.module';
import ChatService from './chat.service';
import ChatController from './chat.controller';
import ChatsGateway from './events/chats.event';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatType, User, Message]),
    ChatTypeModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatsGateway],
  exports: [ChatService],
})
class ChatModule {}

export default ChatModule;
