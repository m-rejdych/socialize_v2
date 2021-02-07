import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from './user.entity';
import UserInterface from './interfaces/user.interface';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(id: string): Promise<UserInterface> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException();

    return user;
  }
}

export default UserService;
