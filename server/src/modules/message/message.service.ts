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
import MessageReactionService from '../messageReaction/messageReaction.service';
import AddMessageReactionDto from './dto/addMessageReaction.dto';
import CreateMessageDto from './dto/createMessage.dto';
import DeleteReactionResponseDto from '../messageReaction/dto/deleteReaction.dto';
import FindOptions from './interface/findOptions.interface';
import DeleteReactionDto from '../messageReaction/dto/deleteReaction.dto';

@Injectable()
class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private userService: UserService,
    private chatService: ChatService,
    private messageReactionService: MessageReactionService,
  ) {}

  async findById(id: number, options?: FindOptions): Promise<Message | null> {
    const message = await this.messageRepository.findOne(id, options);

    return message || null;
  }

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

  async addMessageReaction(
    userId: number,
    { messageId, reactionName }: AddMessageReactionDto,
  ): Promise<Message> {
    const message = await this.findById(messageId, {
      relations: ['reactions'],
    });
    if (!message) {
      throw new NotFoundException('Message not found!');
    }

    const foundReaction = await this.messageReactionService.findByUserAndMessageIds(
      userId,
      messageId,
    );

    if (foundReaction) {
      const updatedReaction = await this.messageReactionService.updateMessageReaction(
        userId,
        foundReaction.id,
        reactionName,
      );

      message.reactions = message.reactions.map((reaction) =>
        reaction.id === updatedReaction.id ? updatedReaction : reaction,
      );
    } else {
      const reaction = await this.messageReactionService.createMessageReaction(
        userId,
        reactionName,
      );

      message.reactions = [...message.reactions, reaction];
    }

    await this.messageRepository.save(message);

    return message;
  }

  async deleteMessageReaction(
    userId: number,
    messageId: number,
  ): Promise<DeleteReactionResponseDto> {
    return await this.messageReactionService.deleteByUserAndMessageIds(
      userId,
      messageId,
    );
  }
}

export default MessageService;
