import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Post from './post.entity';
import User from '../user/user.entity';
import PostReaction from '../postReaction/postReaction.entity';
import Comment from '../comment/comment.entity';
import UserModule from '../user/user.module';
import PostService from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostReaction, Comment]),
    UserModule,
  ],
  providers: [PostService],
})
class PostModule {}

export default PostModule;
