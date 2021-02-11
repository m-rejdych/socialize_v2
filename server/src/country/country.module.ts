import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Country from './country.entity';
import UserInfo from '../userInfo/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, UserInfo])],
})
class CountryModule {}

export default CountryModule;
