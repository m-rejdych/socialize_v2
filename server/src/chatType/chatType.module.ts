import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ChatType from './chatType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatType])],
})
class ChatTypeModule {}

export default ChatTypeModule;
