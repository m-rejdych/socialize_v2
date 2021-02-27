import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MessageReaction from './messageReaction.entity';
import MessageReactionService from './messageReaction.service';
import Message from '../message/message.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';
import ReactionTypeModule from '../reactionType/reactionType.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageReaction, Message, ReactionType, User]),
    ReactionTypeModule,
    UserModule,
  ],
  providers: [MessageReactionService],
  exports: [MessageReactionService],
})
class MessageReactionModule {}

export default MessageReactionModule;
