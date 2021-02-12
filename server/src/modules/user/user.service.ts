import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from './user.entity';
import UserInterface from './interfaces/user.interface';
import UserInfoService from '../userInfo/userInfo.service';
import RegisterDto from '../auth/dto/register.dto';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userInfoService: UserInfoService,
  ) {}

  async findById(id: number): Promise<UserInterface | null> {
    const user = await this.userRepository.findOne(id, {
      relations: ['userInfo'],
    });

    return user || null;
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user || null;
  }

  async createUser({
    email,
    password,
    ...rest
  }: RegisterDto): Promise<UserInterface> {
    const foundUser = await this.findByEmail(email);
    if (foundUser) throw new BadRequestException('Email already in use!');

    const hashedPassword = await hash(password, 12);

    const userInfo = await this.userInfoService.createUserInfo();

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      userInfo,
      ...rest,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export default UserService;
