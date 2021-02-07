import { Module } from '@nestjs/common';

import UserController from './user.controller';

@Module({
  controllers: [UserController],
})
class UserModule {}

export default UserModule;
