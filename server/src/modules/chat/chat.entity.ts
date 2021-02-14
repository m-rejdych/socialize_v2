import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '../user/user.entity';
import ChatType from '../chatType/chatType.entity';
import Message from '../message/message.entity';

@Entity()
class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.chats, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  members: User[];

  @ManyToOne(() => ChatType)
  type: ChatType;

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: ['insert', 'update'],
  })
  messages: Message[];
}

export default Chat;
