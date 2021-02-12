import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Country from '../country/country.entity';
import UserInfo from './userInfo.entity';
import City from '../city/city.entity';
import Relationship from '../relationship/relationship.entity';
import CountryModule from '../country/country.module';
import CityModule from '../city/city.module';
import RelationshipModule from '../relationship/relationship.module';
import UserInfoService from './userInfo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, UserInfo, City, Relationship]),
    CountryModule,
    CityModule,
    RelationshipModule,
  ],
  providers: [UserInfoService],
})
class UserInfoModule {}

export default UserInfoModule;
