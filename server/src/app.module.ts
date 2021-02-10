import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import typeOrmConfigModule from './db/typeorm.module';
import UserModule from './user/user.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    typeOrmConfigModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
