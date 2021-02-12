import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Friendship from './friendship.entity';
import FriendshipInterface from './interfaces/friendship.interface';

@Injectable()
class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
  ) {}

  async findOneByFriendId(
    userId: number,
    friendId: number,
  ): Promise<FriendshipInterface | null> {
    const friendship = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
      .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
      .where('requestedBy.id = :userId OR addressedTo.id = :userId', { userId })
      .andWhere('requestedBy.id = :friendId OR addressedTo.id = :friendId', {
        friendId,
      })
      .getOne();

    return friendship || null;
  }
}

export default FriendshipService;
