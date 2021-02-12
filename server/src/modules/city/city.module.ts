import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import City from './city.entity';
import CityService from './city.service';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService],
  exports: [CityService],
})
class CityModule {}

export default CityModule;
