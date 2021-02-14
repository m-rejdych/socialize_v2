import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PostReaction from './postReaction.entity';
import UserService from '../user/user.service';
import ReactionTypeService from '../reactionType/reactionType.service';
import ReactionName from '../reactionType/types/reactionName.type';
import DeleteByPostAndUserIdsResponseDto from './dto/deleteByPostAndUserIdsResponse.dto';

@Injectable()
class PostReactionService {
  constructor(
    @InjectRepository(PostReaction)
    private postReactionRepository: Repository<PostReaction>,
    private userService: UserService,
    private reactionTypeService: ReactionTypeService,
  ) {}

  async findByUserAndPostIds(
    userId: number,
    postId: number,
  ): Promise<PostReaction | null> {
    const postReaction = await this.postReactionRepository
      .createQueryBuilder('postReaction')
      .leftJoinAndSelect('postReaction.user', 'user')
      .leftJoinAndSelect('postReaction.post', 'post')
      .where('post.id = :postId', { postId })
      .where('user.id = :userId', { userId })
      .getOne();

    return postReaction || null;
  }

  async createPostReaction(
    userId: number,
    reactionName: ReactionName,
  ): Promise<PostReaction> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const type = await this.reactionTypeService.findOneByName(reactionName);

    const postReaction = this.postReactionRepository.create({
      user,
      type,
    });
    await this.postReactionRepository.save(postReaction);

    return postReaction;
  }

  async updatePostReaction(
    userId: number,
    reactionId: number,
    reactionName: ReactionName,
  ): Promise<PostReaction> {
    const postReaction = await this.postReactionRepository.findOne(reactionId, {
      relations: ['user'],
    });
    if (!postReaction) throw new NotFoundException('Post reaciton not found!');
    if (postReaction.user.id !== userId) {
      throw new BadRequestException('You can update only your own reactions!');
    }

    const reactionType = await this.reactionTypeService.findOneByName(
      reactionName,
    );
    if (!reactionType) throw new BadRequestException('Invalid reaction type!');

    postReaction.type = reactionType;
    await this.postReactionRepository.save(postReaction);

    return postReaction;
  }

  async deleteByPostAndUserIds(
    userId: number,
    postId: number,
  ): Promise<DeleteByPostAndUserIdsResponseDto> {
    const postReaction = await this.findByUserAndPostIds(userId, postId);
    if (!postReaction) {
      throw new BadRequestException('Post reaction not found!');
    }
    const reactionId = postReaction.id;

    await this.postReactionRepository.remove(postReaction);

    return {
      postId,
      userId,
      reactionId,
      deleted: true,
    };
  }

  async deleteById(
    userId: number,
    reactionId: number,
  ): Promise<DeleteByPostAndUserIdsResponseDto> {
    const postReaction = await this.postReactionRepository.findOne(reactionId, {
      relations: ['user', 'post'],
    });
    if (!postReaction) throw new NotFoundException('Post reaction not found!');
    if (postReaction.user.id !== userId) {
      throw new BadRequestException('You can delete only your own reactions!');
    }
    const postId = postReaction.post.id;

    await this.postReactionRepository.remove(postReaction);

    return {
      postId,
      userId,
      reactionId,
      deleted: true,
    };
  }
}

export default PostReactionService;
