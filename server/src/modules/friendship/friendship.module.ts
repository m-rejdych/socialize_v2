import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '../user/user.entity';
import Friendship from './friendship.entity';
import FriendhsipController from './frienship.controller';
import FriendshipService from './frienship.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friendship])],
  controllers: [FriendhsipController],
  providers: [FriendshipService],
})
class FriendshipModule {}

export default FriendshipModule;
