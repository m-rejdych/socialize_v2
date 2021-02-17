import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ChatType from './chatType.entity';
import ChatTypeService from './chatType.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatType])],
  providers: [ChatTypeService],
  exports: [ChatTypeService],
})
class ChatTypeModule {}

export default ChatTypeModule;
