import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Chat from './chat.entity';
import ChatType from '../chatType/chatType.entity';
import User from '../user/user.entity';
import Message from '../message/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatType, User, Message])],
})
class ChatModule {}

export default ChatModule;
