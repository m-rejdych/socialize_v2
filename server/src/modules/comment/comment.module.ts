import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Comment from './comment.entity';
import PostModule from '../post/post.module';
import UserModule from '../user/user.module';
import CommentService from './comment.service';
import CommentController from './comment.controller';
import CommentReactionModule from '../commentReaction/commentReaction.module';
import NotificationModule from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PostModule,
    UserModule,
    CommentReactionModule,
    NotificationModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
class CommentModule {}

export default CommentModule;
