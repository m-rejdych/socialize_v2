import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class ReactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default ReactionType;
