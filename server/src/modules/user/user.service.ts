import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from './user.entity';
import FindByEmailOptions from './interfaces/findByEmailOptions.interface';
import UserInfoService from '../userInfo/userInfo.service';
import RegisterDto from '../auth/dto/register.dto';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userInfoService: UserInfoService,
  ) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne(id);

    return user || null;
  }

  async findByEmail(
    email: string,
    options?: FindByEmailOptions,
  ): Promise<User | null> {
    let user: User | undefined;

    if (options?.addPassword) {
      user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email })
        .getOne();
    } else {
      user = await this.userRepository.findOne({ where: { email } });
    }

    return user || null;
  }

  async createUser({ email, password, ...rest }: RegisterDto): Promise<User> {
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
