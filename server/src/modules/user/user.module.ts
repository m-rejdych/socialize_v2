import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import UserEntity from './entities/user.entity';
import UserInfoEntity from './entities/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserInfoEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
