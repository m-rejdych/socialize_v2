import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from './entities/user.entity';
import UserInterface from './interfaces/user.interface';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserInterface | null> {
    const user = await this.userRepository.findOne(id);

    return user || null;
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user || null;
  }
}

export default UserService;
