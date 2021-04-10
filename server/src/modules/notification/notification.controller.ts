import {
  Controller,
  UseGuards,
  Get,
  Req,
  Body,
  Put,
  Query,
} from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import NotificationService from './notification.service';
import Notification from './notification.entity';
import MarkAsSeenByIdDto from './dto/markAsSeenById.dto';
import FindByUserIdOptions from './dto/findByUserIdOptions.dto';

@Controller('notification')
class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(JwtGuard)
  @Get('get-my-notifications')
  async getMyNotifications(
    @Req() req: JwtRequest,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ): Promise<Notification[]> {
    const { id } = req.user;

    const options: FindByUserIdOptions = {};
    if (take) options.take = Number(take);
    if (skip) options.skip = Number(skip);

    return await this.notificationService.findByUserId(id, options);
  }

  @UseGuards(JwtGuard)
  @Get('get-not-seen-notifications-count')
  async getMyNotificationsCount(@Req() req: JwtRequest): Promise<number> {
    const { id } = req.user;

    return await this.notificationService.countNotSeenByUserId(id);
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
