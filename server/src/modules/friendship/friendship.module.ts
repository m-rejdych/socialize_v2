import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '../user/user.entity';
import Friendship from './friendship.entity';
import FriendhsipController from './friendship.controller';
import FriendshipService from './friendship.service';
import UserModule from '../user/user.module';
import ChatModule from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friendship]),
    UserModule,
    ChatModule,
  ],
  controllers: [FriendhsipController],
  providers: [FriendshipService],
})
class FriendshipModule {}

export default FriendshipModule;
