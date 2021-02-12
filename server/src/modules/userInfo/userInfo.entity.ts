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
  age: number;

  @ManyToOne(() => Country)
  country: Country;

  @ManyToOne(() => City)
  city: City;

  @ManyToOne(() => Relationship)
  relaitonship: Relationship;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userInfo, { cascade: true })
  @JoinColumn()
  user: User;
}

export default UserInfo;
