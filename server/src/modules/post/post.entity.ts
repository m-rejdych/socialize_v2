import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../user/user.entity';
import PostReaction from '../postReaction/postReaction.entity';
import Comment from '../comment/comment.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { cascade: true })
  author: User;

  @OneToMany(() => PostReaction, (postReaction) => postReaction.post, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  reactions?: PostReaction[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  comments?: Comment[];
}

export default Post;
