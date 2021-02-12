import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: 'Single' | 'In relationship' | 'Married' | 'Divorced';
}

export default Relationship;
