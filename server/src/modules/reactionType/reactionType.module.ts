import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ReactionType from './reactionType.entity';
import ReactionTypeService from './reactionType.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionType])],
  providers: [ReactionTypeService],
  exports: [ReactionTypeService],
})
class ReactionTypeModule {}

export default ReactionTypeModule;
