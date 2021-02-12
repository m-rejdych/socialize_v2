import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default Country;
