import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import UserInfo from '../userInfo/userInfo.entity';
import PostReaction from '../postReaction/postReaction.entity';
import Post from '../post/post.entity';
import Comment from '../comment/comment.entity';
import CommentReaction from '../commentReaction/commentReaction.entity';
import Chat from '../chat/chat.entity';
import Message from '../message/message.entity';
import MessageReaction from '../messageReaction/messageReaction.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, {
    cascade: ['insert', 'update'],
  })
  userInfo: UserInfo;

  @OneToMany(() => Post, (post) => post.author, {
    cascade: ['insert', 'update'],
  })
  posts: Post[];

  @OneToMany(() => PostReaction, (postReaction) => postReaction.user, {
    cascade: ['insert', 'update'],
  })
  postReactions: PostReaction[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    cascade: ['insert', 'update'],
  })
  comments: Comment[];

  @OneToMany(() => CommentReaction, (commentReaction) => commentReaction.user, {
    cascade: ['insert', 'update'],
  })
  commentReactions: CommentReaction[];

  @ManyToMany(() => Chat, (chat) => chat.members, {
    cascade: ['insert', 'update'],
  })
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.author, {
    cascade: ['insert', 'update'],
  })
  messages: Message[];

  @OneToMany(() => MessageReaction, (messageReaction) => messageReaction.user, {
    cascade: ['insert', 'update'],
  })
  messageReactions: MessageReaction[];
}

export default User;
