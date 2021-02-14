import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CommentReaction from './commentReaction.entity';
import ReactionTypeService from '../reactionType/reactionType.service';
import UserService from '../user/user.service';
import ReactionName from '../reactionType/types/reactionName.type';
import DeleteCommentReactionResponseDto from './dto/deleteCommentReactionResponse.dto';

@Injectable()
class CommentReacitonService {
  constructor(
    @InjectRepository(CommentReaction)
    private commentReacitonRepository: Repository<CommentReaction>,
    private reactionTypeService: ReactionTypeService,
    private userService: UserService,
  ) {}

  async findById(reactionId: number): Promise<CommentReaction | null> {
    const commentReaction = await this.commentReacitonRepository.findOne(
      reactionId,
      { relations: ['user', 'comment'] },
    );

    return commentReaction || null;
  }

  async findByUserAndCommentIds(
    userId: number,
    commentId: number,
  ): Promise<CommentReaction | null> {
    const commentReaction = await this.commentReacitonRepository
      .createQueryBuilder('commentReaction')
      .leftJoinAndSelect('commentReaction.user', 'user')
      .leftJoinAndSelect('commentReaction.comment', 'comment')
      .where('user.id = :userId', { userId })
      .andWhere('comment.id = :commentId', { commentId })
      .getOne();

    return commentReaction || null;
  }

  async createCommentReaction(
    userId: number,
    reactionName: ReactionName,
  ): Promise<CommentReaction> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const type = await this.reactionTypeService.findOneByName(reactionName);

    const commentReaction = this.commentReacitonRepository.create({
      user,
      type,
    });
    await this.commentReacitonRepository.save(commentReaction);

    return commentReaction;
  }

  async updateCommentReaction(
    userId: number,
    reactionId: number,
    reactionName: ReactionName,
  ): Promise<CommentReaction> {
    const commentReaction = await this.findById(reactionId);
    if (!commentReaction) {
      throw new NotFoundException('Comment reaction not found!');
    }
    if (commentReaction.user.id !== userId) {
      throw new UnauthorizedException(
        'You can update only your own comment reactions!',
      );
    }

    const type = await this.reactionTypeService.findOneByName(reactionName);

    commentReaction.type = type;
    await this.commentReacitonRepository.save(commentReaction);

    return commentReaction;
  }

  async deleteById(
    userId: number,
    reactionId: number,
  ): Promise<DeleteCommentReactionResponseDto> {
    const commentReaction = await this.findById(reactionId);
    if (!commentReaction)
      throw new NotFoundException('Comment reaction not found!');
    if (commentReaction.user.id !== userId) {
      throw new UnauthorizedException(
        'You can delete only your own comment reactions!',
      );
    }
    const commentId = commentReaction.comment.id;

    await this.commentReacitonRepository.remove(commentReaction);

    return {
      commentId,
      userId,
      reactionId,
      deleted: true,
    };
  }

  async deleteByUserAndCommentIds(
    userId: number,
    commentId: number,
  ): Promise<DeleteCommentReactionResponseDto> {
    const commentReaction = await this.findByUserAndCommentIds(
      userId,
      commentId,
    );
    if (!commentReaction) {
      throw new NotFoundException('Comment reaciton not found!');
    }
    const reactionId = commentReaction.id;

    await this.commentReacitonRepository.remove(commentReaction);

    return {
      userId,
      commentId,
      reactionId,
      deleted: true,
    };
  }
}

export default CommentReacitonService;
