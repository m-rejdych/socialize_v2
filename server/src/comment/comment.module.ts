import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Comment from './comment.entity';
import Post from '../post/post.entity';
import User from '../user/user.entity';
import CommentReaction from '../commentReaction/commentReaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User, CommentReaction])],
})
class CommentModule {}

export default CommentModule;
