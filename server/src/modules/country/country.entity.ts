import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import UserInfo from '../userInfo/userInfo.entity';

@Entity()
class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserInfo, (userInfo) => userInfo.country)
  userInfos: UserInfo[];
}

export default Country;
