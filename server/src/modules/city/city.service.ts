import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import City from './city.entity';
import CityInterface from './interfaces/city.interface';

@Injectable()
class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async findOrCreateCity(name: string): Promise<CityInterface> {
    const foundCountry = await this.cityRepository.findOne({
      where: { name },
    });

    if (!foundCountry) {
      const country = this.cityRepository.create({ name });
      await this.cityRepository.save(country);

      return country;
    }

    return foundCountry;
  }
}

export default CityService;
