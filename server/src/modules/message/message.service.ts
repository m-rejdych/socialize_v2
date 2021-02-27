import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Message from './message.entity';
import ChatService from '../chat/chat.service';
import UserService from '../user/user.service';
import CreateMessageDto from './dto/createMessage.dto';

@Injectable()
class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private userService: UserService,
    private chatService: ChatService,
  ) {}

  async createMessage(
    userId: number,
    { content, chatId }: CreateMessageDto,
  ): Promise<Message> {
    const isValid = await this.chatService.validateMembership(chatId, userId);
    if (!isValid) {
      throw new ForbiddenException('You are not a member of the chat!');
    }

    const chat = await this.chatService.findById(chatId);

    const author = await this.userService.findById(userId);
    if (!author) throw new NotFoundException('User not found!');

    const message = this.messageRepository.create({
      author,
      chat,
      content,
    });
    await this.messageRepository.save(message);

    return message;
  }
}

export default MessageService;
