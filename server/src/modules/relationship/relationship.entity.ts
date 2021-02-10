import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import UserInfo from '../userInfo/userInfo.entity';

@Entity()
class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserInfo, (userInfo) => userInfo.relaitonship)
  userInfos: UserInfo[];
}

export default Relationship;
