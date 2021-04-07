import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MessageReaction from './messageReaction.entity';
import MessageReactionService from './messageReaction.service';
import ReactionTypeModule from '../reactionType/reactionType.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageReaction]),
    ReactionTypeModule,
    UserModule,
  ],
  providers: [MessageReactionService],
  exports: [MessageReactionService],
})
class MessageReactionModule {}

export default MessageReactionModule;
