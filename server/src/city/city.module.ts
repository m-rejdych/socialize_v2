import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import City from './city.entity';
import UserInfo from '../userInfo/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, UserInfo])],
})
class CityModule {}

export default CityModule;
