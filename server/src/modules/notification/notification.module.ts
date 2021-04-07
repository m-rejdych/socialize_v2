import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Notification from './notification.entity';
import NotificationTypeModule from '../notificationType/notificationType.module';
import UserModule from '../user/user.module';
import NotificationService from './notification.service';
import NotificationController from './notification.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    NotificationTypeModule,
    UserModule,
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
class NotificationModule {}

export default NotificationModule;
