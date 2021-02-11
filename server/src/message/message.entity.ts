import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Chat from '../chat/chat.entity';
import User from '../user/user.entity';
import MessageReaction from '../messageReaction/messageReaction.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @OneToMany(
    () => MessageReaction,
    (messageReaction) => messageReaction.message,
  )
  reactions: MessageReaction[];
}

export default Message;
