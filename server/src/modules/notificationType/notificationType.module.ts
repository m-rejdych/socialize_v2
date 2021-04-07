import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import NotificationType from './notificationType.entity';
import NotificationTypeService from './notificationType.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationType])],
  providers: [NotificationTypeService],
  exports: [NotificationTypeService],
})
class NotificationTypeModule {}

export default NotificationTypeModule;
