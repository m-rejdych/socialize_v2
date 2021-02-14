import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ReactionType from './reactionType.entity';
import ReactionName from './types/reactionName.type';

@Injectable()
class ReactionTypeService {
  constructor(
    @InjectRepository(ReactionType)
    private recationTypeRepository: Repository<ReactionType>,
  ) {}

  async findOneByName(name: ReactionName): Promise<ReactionType> {
    const reactionType = this.recationTypeRepository.findOne({
      where: { name },
    });
    if (!reactionType) throw new BadRequestException('Invalid reaction type!');

    return reactionType;
  }
}

export default ReactionTypeService;
