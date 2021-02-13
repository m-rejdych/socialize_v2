import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Country from './country.entity';

@Injectable()
class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  async findOrCreateCountry(name: string): Promise<Country> {
    const foundCountry = await this.countryRepository.findOne({
      where: { name },
    });

    if (!foundCountry) {
      const country = this.countryRepository.create({ name });
      await this.countryRepository.save(country);

      return country;
    }

    return foundCountry;
  }
}

export default CountryService;
