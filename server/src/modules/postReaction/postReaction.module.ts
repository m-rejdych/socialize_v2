import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostReaction from './postReaction.entity';
import Post from '../post/post.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostReaction, Post, ReactionType, User])],
})
class PostReactionModule {}

export default PostReactionModule;
