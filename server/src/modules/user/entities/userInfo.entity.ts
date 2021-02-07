import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './user.entity';

@Entity()
class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  relaitonship: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => UserEntity, (user) => user.userInfo, { cascade: true })
  @JoinColumn()
  user: UserEntity;
}

export default UserInfo;
