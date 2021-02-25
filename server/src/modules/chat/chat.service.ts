import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Chat from './chat.entity';
import CreateChatDto from './dto/createChat.dto';
import UserService from '../user/user.service';
import ChatTypeService from '../chatType/chatType.service';

@Injectable()
class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private userService: UserService,
    private chatTypeService: ChatTypeService,
  ) {}

  async findById(id: number): Promise<Chat | null> {
    const chat = await this.chatRepository.findOne(id);

    return chat || null;
  }

  async findFriendChatByIds(ids: [number, number]): Promise<Chat | null> {
    if (ids.length !== 2) {
      throw new BadRequestException(
        'There must be 2 friend ids in friend chat!',
      );
    }
    if (ids[0] === ids[1]) {
      throw new BadRequestException('Ids can not be the same!');
    }

    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.members', 'members')
      .leftJoinAndSelect('chat.type', 'type')
      .where('members.id IN (:...ids)', { ids })
      .andWhere('type.name = :name', { name: 'friend' })
      .getMany();

    const chat = chats.find(
      ({ members }) =>
        members.some(({ id }) => id === ids[0]) &&
        members.some(({ id }) => id === ids[1]),
    );

    return chat || null;
  }

  async createChat({ type, membersIds }: CreateChatDto): Promise<Chat> {
    const members = await this.userService.findByIds(membersIds);
    if (members.length < 2) {
      throw new BadRequestException('At least 2 members were not found!');
    }

    const chatType = await this.chatTypeService.findByName(type);

    const chat = this.chatRepository.create({
      members,
      type: chatType,
    });
    await this.chatRepository.save(chat);

    return chat;
  }
}

export default ChatService;
