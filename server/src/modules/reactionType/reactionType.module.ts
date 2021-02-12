import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ReactionType from './reactionType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionType])],
})
class ReactionTypeModule {}

export default ReactionTypeModule;
