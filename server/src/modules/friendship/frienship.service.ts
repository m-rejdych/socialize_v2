import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Friendship from './friendship.entity';
import FindOneOptions from './interfaces/findOneOptions.interface';
import UserService from '../user/user.service';
import DeleteFriendshipReponseDto from './dto/deleteFriendshipResponse.dto';

@Injectable()
class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    private userService: UserService,
  ) {}

  async findOne(
    userId: number,
    friendId: number,
    options?: FindOneOptions,
  ): Promise<Friendship | null> {
    let friendship: Friendship | null;

    if (options?.addressedToMe) {
      friendship = await this.friendshipRepository
        .createQueryBuilder('friendship')
        .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
        .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
        .where('addressedTo.id = :userId', { userId })
        .andWhere('requestedBy.id = :friendId', { friendId })
        .getOne();
    } else if (options?.requestedByMe) {
      friendship = await this.friendshipRepository
        .createQueryBuilder('friendship')
        .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
        .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
        .where('requestedBy.id = :userId', { userId })
        .andWhere('addressedTo.id = :friendId', { friendId })
        .getOne();
    } else {
      friendship = await this.friendshipRepository
        .createQueryBuilder('friendship')
        .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
        .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
        .where('requestedBy.id = :userId OR addressedTo.id = :userId', {
          userId,
        })
        .andWhere('requestedBy.id = :friendId OR addressedTo.id = :friendId', {
          friendId,
        })
        .getOne();
    }

    return friendship || null;
  }

  async createFriendship(
    userId: number,
    friendId: number,
  ): Promise<Friendship> {
    const foundFriendship = await this.findOne(userId, friendId);
    if (foundFriendship) {
      throw new BadRequestException('Friendship already exists!');
    }

    const requestedBy = await this.userService.findById(userId);
    if (!requestedBy) throw new NotFoundException('User not found!');

    const addressedTo = await this.userService.findById(friendId);
    if (!addressedTo) throw new NotFoundException('User not found!');

    const friendship = this.friendshipRepository.create({
      requestedBy,
      addressedTo,
    });
    await this.friendshipRepository.save(friendship);

    return friendship;
  }

  async acceptFriendship(
    userId: number,
    friendId: number,
  ): Promise<Friendship> {
    const friendship = await this.findOne(userId, friendId, {
      addressedToMe: true,
    });
    if (!friendship) throw new NotFoundException('Friendhsip not found!');
    if (friendship.isAccpted)
      throw new BadRequestException('Friendship already accepted!');

    friendship.isAccpted = true;
    this.friendshipRepository.save(friendship);

    return friendship;
  }

  async deleteFriendship(
    userId: number,
    friendId: number,
  ): Promise<DeleteFriendshipReponseDto> {
    const friendship = await this.findOne(userId, friendId);
    if (!friendship) throw new NotFoundException('Friendship not found!');

    await this.friendshipRepository.remove(friendship);

    return {
      userId,
      friendId,
      deleted: true,
    };
  }
}

export default FriendshipService;
