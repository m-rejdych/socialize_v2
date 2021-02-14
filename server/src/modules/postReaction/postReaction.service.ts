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

@Injectable()
class PostReactionService {
  constructor(
    @InjectRepository(PostReaction)
    private postReactionRepository: Repository<PostReaction>,
    private userService: UserService,
    private reactionTypeService: ReactionTypeService,
  ) {}

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
}

export default PostReactionService;
