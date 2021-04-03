import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Chat from './chat.entity';
import ChatType from '../chatType/chatType.entity';
import User from '../user/user.entity';
import Message from '../message/message.entity';
import ChatTypeModule from '../chatType/chatType.module';
import UserModule from '../user/user.module';
import ChatService from './chat.service';
import JoinChatEvent from './events/joinChat.event';
import LeaveChatEvent from './events/leaveChat.event';
import ChatController from './chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatType, User, Message]),
    ChatTypeModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, JoinChatEvent, LeaveChatEvent],
  exports: [ChatService],
})
class ChatModule {}

export default ChatModule;
