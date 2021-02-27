import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import MessageReaction from './messageReaction.entity';
import ReactionTypeService from '../reactionType/reactionType.service';
import UserService from '../user/user.service';
import ReactionName from '../reactionType/types/reactionName.type';
import FindOptions from './interfaces/findOptions.interface';
import DeleteReactionDto from './dto/deleteReaction.dto';

@Injectable()
class MessageReactionService {
  constructor(
    @InjectRepository(MessageReaction)
    private messageReactionRepository: Repository<MessageReaction>,
    private reactionTypeService: ReactionTypeService,
    private userService: UserService,
  ) {}

  async findById(
    id: number,
    options?: FindOptions,
  ): Promise<MessageReaction | null> {
    const messageReaction = await this.messageReactionRepository.findOne(
      id,
      options,
    );

    return messageReaction || null;
  }

  async findByUserAndMessageIds(
    userId: number,
    messageId: number,
  ): Promise<MessageReaction | null> {
    const messageReaction = await this.messageReactionRepository
      .createQueryBuilder('messageReaction')
      .leftJoinAndSelect('messageReaction.user', 'user')
      .leftJoinAndSelect('messageReaction.message', 'message')
      .where('message.id = :messageId', { messageId })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    return messageReaction || null;
  }

  async createMessageReaction(
    userId: number,
    reactionName: ReactionName,
  ): Promise<MessageReaction> {
    const reactionType = await this.reactionTypeService.findOneByName(
      reactionName,
    );

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const messageReaction = this.messageReactionRepository.create({
      type: reactionType,
      user,
    });
    await this.messageReactionRepository.save(messageReaction);

    return messageReaction;
  }

  async updateMessageReaction(
    userId: number,
    reactionId: number,
    reactionName: ReactionName,
  ): Promise<MessageReaction> {
    const messageReaction = await this.findById(reactionId, {
      relations: ['user'],
    });
    if (!messageReaction) throw new NotFoundException('Reaction not found!');
    if (messageReaction.user.id !== userId) {
      throw new ForbiddenException('You can update only your own reactions!');
    }

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const reactionType = await this.reactionTypeService.findOneByName(
      reactionName,
    );

    messageReaction.type = reactionType;
    await this.messageReactionRepository.save(messageReaction);

    return messageReaction;
  }

  async deleteByUserAndMessageIds(
    userId: number,
    messageId: number,
  ): Promise<DeleteReactionDto> {
    const messageReaction = await this.messageReactionRepository
      .createQueryBuilder('messageReaction')
      .leftJoinAndSelect('messageReaction.message', 'message')
      .leftJoinAndSelect('messageReaction.user', 'user')
      .where('message.id = :messageId', { messageId })
      .andWhere('user.id = :userId', { userId })
      .getOne();
    if (!messageReaction) {
      throw new NotFoundException('Message reaction not found!');
    }

    const reactionId = messageReaction.id;

    await this.messageReactionRepository.remove(messageReaction);

    return {
      userId,
      messageId,
      reactionId,
      deleted: true,
    };
  }
}

export default MessageReactionService;
