import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Relationship from './relationship.entity';
import RelationshipService from './relationship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship])],
  providers: [RelationshipService],
})
class RelationshipModule {}

export default RelationshipModule;
