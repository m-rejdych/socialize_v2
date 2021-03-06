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
import ChatService from '../chat/chat.service';
import DeleteFriendshipReponseDto from './dto/deleteFriendshipResponse.dto';
import CreateFriendshipResponseDto from './dto/createFriendshipResponse.dto';
import NotificationGateway from '../notification/events/notifications.event';

@Injectable()
class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    private userService: UserService,
    private chatService: ChatService,
    private notificationGateway: NotificationGateway,
  ) {}

  async findOne(
    userId: number,
    friendId: number,
    options?: FindOneOptions,
  ): Promise<Friendship | null> {
    if (userId === friendId) {
      throw new BadRequestException(
        'User id and friend id can not be the same!',
      );
    }

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
        .where('requestedBy.id = :userId', {
          userId,
        })
        .andWhere('addressedTo.id = :friendId', {
          friendId,
        })
        .orWhere('addressedTo.id = :userId', { userId })
        .andWhere('requestedBy.id = :friendId', { friendId })
        .getOne();
    }

    return friendship || null;
  }

  async findAccpetedByUserId(userId: number): Promise<Friendship[]> {
    const friendships = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
      .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
      .where('friendship.isAccepted = :isTrue', { isTrue: true })
      .andWhere('requestedBy.id = :userId OR addressedTo.id = :userId', {
        userId,
      })
      .getMany();

    return friendships;
  }

  async findAllByUserId(userId: number): Promise<Friendship[]> {
    const friendships = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requestedBy', 'requestedBy')
      .leftJoinAndSelect('friendship.addressedTo', 'addressedTo')
      .where('requestedBy.id = :userId OR addressedTo.id = :userId', {
        userId,
      })
      .getMany();

    return friendships;
  }

  async createFriendship(
    userId: number,
    friendId: number,
  ): Promise<Friendship> {
    if (userId === friendId) {
      throw new BadRequestException(
        'User id and friend id can not be the same!',
      );
    }

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

    this.notificationGateway.sendNotification({
      from: userId,
      to: friendId,
      targetId: userId,
      notificationName: 'friendshipRequest',
    });

    return friendship;
  }

  async acceptFriendship(
    userId: number,
    friendId: number,
  ): Promise<CreateFriendshipResponseDto> {
    if (userId === friendId) {
      throw new BadRequestException(
        'User id and friend id can not be the same!',
      );
    }

    const friendship = await this.findOne(userId, friendId);
    if (friendship.requestedBy.id === userId) {
      throw new BadRequestException(
        'You can not accept friendship requested by yourself!',
      );
    }
    if (!friendship) throw new NotFoundException('Friendhsip not found!');
    if (friendship.isAccepted) {
      throw new BadRequestException('Friendship already accepted!');
    }

    friendship.isAccepted = true;
    this.friendshipRepository.save(friendship);

    let chat = await this.chatService.findFriendChatByIds([userId, friendId]);

    if (!chat) {
      chat = await this.chatService.createChat({
        type: 'friend',
        membersIds: [userId, friendId],
      });
    }

    this.notificationGateway.sendNotification({
      from: userId,
      to: friendId,
      targetId: userId,
      notificationName: 'friendshipAccept',
    });

    return {
      friendship,
      chat,
    };
  }

  async deleteFriendship(
    userId: number,
    friendId: number,
  ): Promise<DeleteFriendshipReponseDto> {
    if (userId === friendId) {
      throw new BadRequestException(
        'User id and friend id can not be the same!',
      );
    }

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
