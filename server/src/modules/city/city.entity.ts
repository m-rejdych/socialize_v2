import { userInfo } from 'os';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import UserInfo from '../userInfo/userInfo.entity';

@Entity()
class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserInfo, (userInfo) => userInfo.city)
  userInfos: UserInfo[];
}

export default City;
