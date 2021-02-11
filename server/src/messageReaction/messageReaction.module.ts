import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MessageReaction from './messageReaction.entity';
import Message from '../message/message.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageReaction, Message, ReactionType, User]),
  ],
})
class MessageReactionModule {}

export default MessageReactionModule;
