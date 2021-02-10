import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import User from '../user/user.entity';
import ReactionType from '../reactionType/reactionType.entity';
import Post from '../post/post.entity';

@Entity()
class PostReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.reactions)
  post: Post;

  @ManyToOne(() => User, (user) => user.postReactions)
  user: User;

  @ManyToOne(() => ReactionType)
  type: ReactionType;
}

export default PostReaction;
