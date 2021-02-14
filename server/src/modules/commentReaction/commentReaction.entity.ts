import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Comment from '../comment/comment.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';

@Entity()
class CommentReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment, (comment) => comment.reactions, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comment: Comment;

  @ManyToOne(() => ReactionType)
  type: ReactionType;

  @ManyToOne(() => User, (user) => user.commentReactions, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}

export default CommentReaction;
