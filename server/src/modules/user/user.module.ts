import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import UserInfoModule from '../userInfo/userInfo.module';
import User from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserInfoModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
