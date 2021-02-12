import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserInfo from './userInfo.entity';
import CountryService from '../country/country.service';
import CityService from '../city/city.service';
import RelationshipService from '../relationship/relationship.service';
import UserInfoInterface from './interfaces/userInfo.interface';
import UpdateUserInfoDto from './dto/updateUserInfo.dto';

@Injectable()
class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    private countryService: CountryService,
    private cityService: CityService,
    private relationshipService: RelationshipService,
  ) {}

  async createUserInfo(userId: string): Promise<UserInfoInterface> {
    const foundUserInfo = await this.userInfoRepository
      .createQueryBuilder('userInfo')
      .leftJoinAndSelect('userInfo.user', 'user', 'user.id = :userId', {
        userId,
      })
      .getOne();
    if (foundUserInfo) {
      throw new BadRequestException('This user already has user info!');
    }

    const userInfo = this.userInfoRepository.create({});

    return userInfo;
  }

  async getByUserId(userId: number): Promise<UserInfoInterface> {
    const userInfo = await this.userInfoRepository
      .createQueryBuilder('userInfo')
      .leftJoinAndSelect('userInfo.user', 'user', 'user.id = :userId', {
        userId,
      })
      .getOne();

    if (!userInfo) throw new NotFoundException('User info not found!');

    return userInfo;
  }

  async updateByUserId(
    userId: number,
    { city, country, relationship, age }: UpdateUserInfoDto,
  ): Promise<UserInfoInterface> {
    const userInfo = await this.userInfoRepository
      .createQueryBuilder('userInfo')
      .leftJoinAndSelect('userInfo.user', 'user', 'user.id = :userId', {
        userId,
      })
      .getOne();
    if (!userInfo) throw new NotFoundException('User info not found!');

    if (city) {
      const cityInstance = await this.cityService.findOrCreateCity(city);
      userInfo.city = cityInstance;
    }
    if (country) {
      const countryInstance = await this.countryService.findOrCreateCountry(
        country,
      );
      userInfo.country = countryInstance;
    }
    if (relationship) {
      const relationshipInstance = await this.relationshipService.findOneByName(
        relationship,
      );
      if (!relationshipInstance) {
        throw new BadRequestException('Ivalid relationship type!');
      }
      userInfo.relaitonship = relationshipInstance;
    }
    if (age) userInfo.age = age;

    await this.userInfoRepository.save(userInfo);

    return userInfo;
  }
}

export default UserInfoService;
