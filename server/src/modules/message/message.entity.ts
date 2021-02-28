import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @ManyToOne(() => User, (user) => user.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  author: User;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  chat: Chat;

  @OneToMany(
    () => MessageReaction,
    (messageReaction) => messageReaction.message,
    { cascade: ['insert', 'update'], nullable: true },
  )
  reactions?: MessageReaction[];

  @ManyToMany(() => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  seenBy: User[];
}

export default Message;
