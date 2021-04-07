import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import NotificationName from './types/notificationName.type';

@Entity()
class NotificationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: NotificationName;
}

export default NotificationType;
