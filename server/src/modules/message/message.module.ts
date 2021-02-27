import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Message from './message.entity';
import MessageService from './message.service';
import MessageController from './message.controller';
import MessageReaction from '../messageReaction/messageReaction.entity';
import Chat from '../chat/chat.entity';
import User from '../user/user.entity';
import UserModule from '../user/user.module';
import ChatModule from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageReaction, Chat, User]),
    UserModule,
    ChatModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
class MessageModule {}

export default MessageModule;
