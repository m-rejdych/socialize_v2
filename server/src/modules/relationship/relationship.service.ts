import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Relationship from './relationship.entity';
import RelationshipInterface from './interfaces/relationship.interface';

@Injectable()
class RelationshipService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipRepository: Repository<Relationship>,
  ) {}

  async findOneByName(name: string): Promise<RelationshipInterface> {
    const relationship = await this.relationshipRepository.findOne({
      where: { name },
    });

    if (!relationship)
      throw new BadRequestException('Invalid relationship name!');

    return relationship;
  }
}

export default RelationshipService;
