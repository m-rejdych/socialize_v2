import {
  Controller,
  UseGuards,
  Get,
  Req,
  Post,
  Body,
  Put,
} from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import NotificationService from './notification.service';
import Notification from './notification.entity';
import CreateNotificationDto from './dto/createNotification.dto';
import MarkAsSeenByIdDto from './dto/markAsSeenById.dto';

@Controller('notification')
class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(JwtGuard)
  @Get('get-my-notifications')
  async getMyNotifications(@Req() req: JwtRequest): Promise<Notification[]> {
    const { id } = req.user;

    return await this.notificationService.findByUserId(id);
  }

  @UseGuards(JwtGuard)
  @Get('get-not-seen-notifications-count')
  async getMyNotificationsCount(@Req() req: JwtRequest): Promise<number> {
    const { id } = req.user;

    return await this.notificationService.countNotSeenByUserId(id);
  }

  @UseGuards(JwtGuard)
  @Post('create-notification')
  async createNotification(
    @Body() data: CreateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationService.createNotification(data);
  }

  @UseGuards(JwtGuard)
  @Put('mark-all-as-seen')
  async markAllAsSeen(@Req() req: JwtRequest): Promise<Notification[]> {
    const { id } = req.user;

    return await this.notificationService.markAllAsSeenByUserId(id);
  }

  @UseGuards(JwtGuard)
  @Put('mark-as-seen-by-id')
  async markAsSeenById(
    @Req() req: JwtRequest,
    @Body() { notificationId }: MarkAsSeenByIdDto,
  ): Promise<Notification> {
    const { id } = req.user;

    return await this.notificationService.markAsSeenById(id, notificationId);
  }
}

export default NotificationController;
