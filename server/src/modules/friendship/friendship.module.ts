import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Friendship from './friendship.entity';
import FriendhsipController from './friendship.controller';
import FriendshipService from './friendship.service';
import UserModule from '../user/user.module';
import ChatModule from '../chat/chat.module';
import NotificationModule from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friendship]),
    UserModule,
    ChatModule,
    NotificationModule,
  ],
  controllers: [FriendhsipController],
  providers: [FriendshipService],
  exports: [FriendshipService],
})
class FriendshipModule {}

export default FriendshipModule;
