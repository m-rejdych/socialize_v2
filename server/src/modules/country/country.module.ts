import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Country from './country.entity';
import CountryService from './country.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryService],
  exports: [CountryService],
})
class CountryModule {}

export default CountryModule;
