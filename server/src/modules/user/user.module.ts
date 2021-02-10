import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import User from './user.entity';
import UserInfo from '../userInfo/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
