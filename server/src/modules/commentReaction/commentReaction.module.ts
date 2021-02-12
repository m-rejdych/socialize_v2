import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CommentReaction from './commentReaction.entity';
import Comment from '../comment/comment.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentReaction, Comment, ReactionType, User]),
  ],
})
class CommentReactionModule {}

export default CommentReactionModule;
