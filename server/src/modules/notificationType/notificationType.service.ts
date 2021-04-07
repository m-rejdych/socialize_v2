import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import NotificationType from './notificationType.entity';
import NotificationName from './types/notificationName.type';

@Injectable()
class NotificationTypeService {
  constructor(
    @InjectRepository(NotificationType)
    private notificationTypeRepository: Repository<NotificationType>,
  ) {}

  async findByName(name: NotificationName): Promise<NotificationType> {
    const notificationType = await this.notificationTypeRepository.findOne({
      where: { name },
    });

    if (!notificationType) {
      throw new NotFoundException('Notification type not found!');
    }

    return notificationType;
  }
}

export default NotificationTypeService;
