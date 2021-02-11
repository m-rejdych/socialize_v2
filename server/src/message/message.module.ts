import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Message from './message.entity';
import MessageReaction from '../messageReaction/messageReaction.entity';
import Chat from '../chat/chat.entity';
import User from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageReaction, Chat, User])],
})
class MessageModule {}

export default MessageModule;
