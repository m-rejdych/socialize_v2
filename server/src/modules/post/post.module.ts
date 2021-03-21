import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Post from './post.entity';
import User from '../user/user.entity';
import PostReaction from '../postReaction/postReaction.entity';
import Comment from '../comment/comment.entity';
import UserModule from '../user/user.module';
import PostService from './post.service';
import FriendshipModule from '../friendship/friendship.module';
import PostController from './post.controller';
import PostReactionModule from '../postReaction/postReaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostReaction, Comment]),
    UserModule,
    PostReactionModule,
    FriendshipModule,
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
class PostModule {}

export default PostModule;
