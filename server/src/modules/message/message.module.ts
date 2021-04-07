import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Message from './message.entity';
import MessageService from './message.service';
import MessageController from './message.controller';
import UserModule from '../user/user.module';
import ChatModule from '../chat/chat.module';
import MessageReactionModule from '../messageReaction/messageReaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UserModule,
    ChatModule,
    MessageReactionModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
class MessageModule {}

export default MessageModule;
