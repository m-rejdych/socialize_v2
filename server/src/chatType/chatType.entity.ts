import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import Chat from '../chat/chat.entity';

@Entity()
class ChatType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default ChatType;
