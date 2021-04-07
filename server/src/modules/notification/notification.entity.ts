import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import NotificationType from '../notificationType/notificationType.entity';
import User from '../user/user.entity';

@Entity()
class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seen: boolean;

  @Column()
  targetId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => NotificationType)
  type: NotificationType;

  @ManyToOne(() => User, (user) => user.notifications, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => User)
  sender: User;
}

export default Notification;
