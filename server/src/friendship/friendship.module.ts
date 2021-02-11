import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '../user/user.entity';
import Friendship from './firendship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friendship])],
})
class FriendshipModule {}

export default FriendshipModule;
