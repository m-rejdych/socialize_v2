import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostReaction from './postReaction.entity';
import Post from '../post/post.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';
import UserModule from '../user/user.module';
import ReactionTypeModule from '../reactionType/reactionType.module';
import PostReactionService from './postReaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostReaction, Post, ReactionType, User]),
    UserModule,
    ReactionTypeModule,
  ],
  providers: [PostReactionService],
  exports: [PostReactionService],
})
class PostReactionModule {}

export default PostReactionModule;
