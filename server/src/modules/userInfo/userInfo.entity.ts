import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../user/user.entity';
import Country from '../country/country.entity';
import City from '../city/city.entity';
import Relationship from '../relationship/relationship.entity';

@Entity()
class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  age?: number;

  @ManyToOne(() => Country, { nullable: true })
  country?: Country;

  @ManyToOne(() => City, { nullable: true })
  city?: City;

  @ManyToOne(() => Relationship, { nullable: true })
  relationship?: Relationship;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userInfo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

export default UserInfo;
