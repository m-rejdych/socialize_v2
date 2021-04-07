import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CommentReaction from './commentReaction.entity';
import ReactionTypeModule from '../reactionType/reactionType.module';
import UserModule from '../user/user.module';
import CommentReactionService from './commentReaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentReaction]),
    ReactionTypeModule,
    UserModule,
  ],
  providers: [CommentReactionService],
  exports: [CommentReactionService],
})
class CommentReactionModule {}

export default CommentReactionModule;
