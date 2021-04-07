import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserInfo from './userInfo.entity';
import CountryModule from '../country/country.module';
import CityModule from '../city/city.module';
import RelationshipModule from '../relationship/relationship.module';
import UserInfoService from './userInfo.service';
import UserInfoController from './userInfo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo]),
    CountryModule,
    CityModule,
    RelationshipModule,
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController],
  exports: [UserInfoService],
})
class UserInfoModule {}

export default UserInfoModule;
