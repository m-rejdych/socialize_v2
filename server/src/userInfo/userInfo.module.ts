import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Country from '../country/country.entity';
import UserInfo from './userInfo.entity';
import City from '../city/city.entity';
import Relationship from '../relationship/relationship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, UserInfo, City, Relationship])],
})
class UserInfoModule {}

export default UserInfoModule;
