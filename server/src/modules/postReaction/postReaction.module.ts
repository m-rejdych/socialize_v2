import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostReaction from './postReaction.entity';
import UserModule from '../user/user.module';
import ReactionTypeModule from '../reactionType/reactionType.module';
import PostReactionService from './postReaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostReaction]),
    UserModule,
    ReactionTypeModule,
  ],
  providers: [PostReactionService],
  exports: [PostReactionService],
})
class PostReactionModule {}

export default PostReactionModule;
