import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Relationship from './relationship.entity';
import UserInfo from '../userInfo/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship, UserInfo])],
})
class RelationshipModule {}

export default RelationshipModule;
