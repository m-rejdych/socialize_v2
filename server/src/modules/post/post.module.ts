import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Post from './post.entity';
import UserModule from '../user/user.module';
import PostService from './post.service';
import FriendshipModule from '../friendship/friendship.module';
import PostController from './post.controller';
import PostReactionModule from '../postReaction/postReaction.module';
import NotificationModule from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    PostReactionModule,
    FriendshipModule,
    NotificationModule,
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
class PostModule {}

export default PostModule;
