import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CommentReaction from './commentReaction.entity';
import Comment from '../comment/comment.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';
import ReactionTypeModule from '../reactionType/reactionType.module';
import UserModule from '../user/user.module';
import CommentReactionService from './commentReaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentReaction, Comment, ReactionType, User]),
    ReactionTypeModule,
    UserModule,
  ],
  providers: [CommentReactionService],
  exports: [CommentReactionService],
})
class CommentReactionModule {}

export default CommentReactionModule;
