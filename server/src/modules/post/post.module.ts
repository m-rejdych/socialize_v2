import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Post from './post.entity';
import User from '../user/user.entity';
import PostReaction from '../postReaction/postReaction.entity';
import Comment from '../comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostReaction, Comment])],
})
class PostModule {}

export default PostModule;
