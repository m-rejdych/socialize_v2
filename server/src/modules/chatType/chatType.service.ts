import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ChatType from './chatType.entity';
import ChatName from './types/chatName.type';

@Injectable()
class ChatTypeService {
  constructor(
    @InjectRepository(ChatType)
    private chatTypeRepository: Repository<ChatType>,
  ) {}

  async findByName(name: ChatName): Promise<ChatType> {
    const chatType = await this.chatTypeRepository.findOne({ where: { name } });
    if (!chatType) throw new NotFoundException('Chat type not found!');

    return chatType;
  }
}

export default ChatTypeService;
