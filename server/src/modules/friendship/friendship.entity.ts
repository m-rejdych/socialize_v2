import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../user/user.entity';

@Entity()
class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  requestedBy: User;

  @ManyToOne(() => User)
  addressedTo: User;
}

export default Friendship;
