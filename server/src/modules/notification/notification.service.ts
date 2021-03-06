import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
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
    if (from === to) {
      throw new BadRequestException(
        'You can not send notifications to yourself!',
      );
    }

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
    let notifications: Notification[] = [];

    if (options?.notSeenOnly) {
      if (options?.skip && options?.take) {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .andWhere('notification.seen = :isSeen', { isSeen: false })
          .skip(options.skip)
          .take(options.take)
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      } else if (options?.skip) {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .andWhere('notification.seen = :isSeen', { isSeen: false })
          .skip(options.skip)
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      } else if (options?.take) {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .andWhere('notification.seen = :isSeen', { isSeen: false })
          .take(options.take)
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      } else {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .andWhere('notification.seen = :isSeen', { isSeen: false })
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      }
    } else {
      if (options?.skip && options?.take) {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .take(options.take)
          .skip(options.skip)
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      } else if (options?.skip) {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .skip(options.skip)
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      } else if (options?.take) {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .take(options.take)
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      } else {
        notifications = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .leftJoinAndSelect('notification.sender', 'sender')
          .leftJoinAndSelect('notification.type', 'type')
          .where('user.id = :userId', { userId })
          .orderBy('notification.createdAt', 'DESC')
          .getMany();
      }
    }

    return notifications;
  }

  async countByUserId(userId: number): Promise<number> {
    const notificationsCount = this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoin('notification.user', 'user')
      .where('user.id = :userId', { userId })
      .getCount();

    return notificationsCount;
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
