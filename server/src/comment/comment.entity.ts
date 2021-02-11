import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import User from '../user/user.entity';
import Post from '../post/post.entity';
import CommentReaction from '../commentReaction/commentReaction.entity';

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @OneToMany(
    () => CommentReaction,
    (commentReaction) => commentReaction.comment,
  )
  reactions: CommentReaction[];
}

export default Comment;