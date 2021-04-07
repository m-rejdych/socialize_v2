import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserService from '../user/user.service';
import NotificationTypeService from '../notificationType/notificationType.service';
import Notification from './notification.entity';
import CreateNotificationDto from './dto/createNotification.dto';
import FindByUserIdOptions from './dto/findByUserIdOptions.dto';

@Injectable()
class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private userService: UserService,
    private notificationTypeService: NotificationTypeService,
  ) {}

  async validateUser(userId: number, notificationId: number): Promise<boolean> {
    const notification = await this.notificationRepository.findOne(
      notificationId,
      { relations: ['user'] },
    );
    if (!notification) throw new NotFoundException();

    return notification.user.id === userId;
  }

  async createNotification({
    from,
    to,
    notificationName,
    ...rest
  }: CreateNotificationDto): Promise<Notification> {
    const notificationType = await this.notificationTypeService.findByName(
      notificationName,
    );

    const fromUser = await this.userService.findById(from);
    if (!fromUser) throw new NotFoundException('User not found!');

    const toUser = await this.userService.findById(to);
    if (!toUser) throw new NotFoundException('User not found!');

    const notification = this.notificationRepository.create({
      user: toUser,
      sender: fromUser,
      type: notificationType,
      ...rest,
    });

    await this.notificationRepository.save(notification);

    return notification;
  }

  async findByUserId(
    userId: number,
    options?: FindByUserIdOptions,
  ): Promise<Notification[]> {
    const notifications = options?.notSeenOnly
      ? await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoin('notification.user', 'user')
          .where('user.id = :userId', { userId })
          .andWhere('notification.seen = :isSeen', { isSeen: false })
          .getMany()
      : await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoin('notification.user', 'user')
          .where('user.id = :userId', { userId })
          .getMany();

    return notifications;
  }

  async countNotSeenByUserId(userId: number): Promise<number> {
    const notificationsCount = await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoin('notification.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('notification.seen = :isSeen', { isSeen: false })
      .getCount();

    return notificationsCount;
  }

  async markAllAsSeenByUserId(userId: number): Promise<Notification[]> {
    const notifications = await this.findByUserId(userId, {
      notSeenOnly: true,
    });

    const promises: Promise<Notification>[] = [];

    notifications.forEach((notification) => {
      notification.seen = true;
      promises.push(this.notificationRepository.save(notification));
    });

    await Promise.all(promises);

    return notifications;
  }

  async markAsSeenById(
    userId: number,
    notificationId: number,
  ): Promise<Notification> {
    const isValid = await this.validateUser(userId, notificationId);
    if (!isValid) {
      throw new ForbiddenException(
        'You can mark as seen only your own notifications!',
      );
    }

    const notification = await this.notificationRepository.findOne(
      notificationId,
    );

    notification.seen = true;
    await this.notificationRepository.save(notification);

    return notification;
  }
}

export default NotificationService;
