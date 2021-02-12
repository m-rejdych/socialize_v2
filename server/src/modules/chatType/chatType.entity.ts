import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class ChatType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default ChatType;
