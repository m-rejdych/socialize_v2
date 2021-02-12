import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default City;
