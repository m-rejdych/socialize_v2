import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Comment from './comment.entity';
import Post from '../post/post.entity';
import User from '../user/user.entity';
import CommentReaction from '../commentReaction/commentReaction.entity';
import PostModule from '../post/post.module';
import UserModule from '../user/user.module';
import CommentService from './comment.service';
import CommentController from './comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User, CommentReaction]),
    PostModule,
    UserModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
class CommentModule {}

export default CommentModule;
