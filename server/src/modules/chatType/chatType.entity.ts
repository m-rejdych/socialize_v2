import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import ChatName from './types/chatName.type';

@Entity()
class ChatType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: ChatName;
}

export default ChatType;
