import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import ReactionName from './types/reactionName.type';

@Entity()
class ReactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: ReactionName;
}

export default ReactionType;
