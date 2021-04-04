import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
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
import MarkAllAsSeenResponseDto from './dto/markAllAsSeenResponse.dto';
import FindOptions from './interface/findOptions.interface';

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

  async findAllByChatId(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.chat', 'chat')
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('message.seenBy', 'seenBy')
      .leftJoinAndSelect('message.reactions', 'reactions')
      .leftJoinAndSelect('reactions.user', 'reactionsUser')
      .leftJoinAndSelect('reactions.type', 'reactionsType')
      .where('chat.id = :chatId', { chatId })
      .orderBy('message.createdAt', 'ASC')
      .getMany();

    return messages;
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
      seenBy: [author],
    });
    await this.messageRepository.save(message);

    return message;
  }

  async markAsSeen(userId: number, messageId: number): Promise<Message> {
    const message = await this.findById(messageId, {
      relations: ['chat', 'chat.members', 'seenBy'],
    });
    if (!message) throw new NotFoundException('Message not found!');

    const isValid = await this.chatService.validateMembership(
      message.chat.id,
      userId,
    );
    if (!isValid) {
      throw new ForbiddenException(
        'You can mark as seen messages only of chats that you are member of!',
      );
    }

    if (message.seenBy.some(({ id }) => id === userId)) {
      throw new BadRequestException(
        'This message is already marked as seen by you!',
      );
    }

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    message.seenBy = [...message.seenBy, user];
    await this.messageRepository.save(message);

    return message;
  }

  async markAllAsSeen(
    userId: number,
    chatId: number,
  ): Promise<MarkAllAsSeenResponseDto> {
    const isValid = await this.chatService.validateMembership(chatId, userId);
    if (!isValid) {
      throw new ForbiddenException(
        'You can mark as seen messages only of chats that you are member of!',
      );
    }

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chat', 'chat')
      .leftJoinAndSelect('message.seenBy', 'seenBy')
      .where('chat.id = :chatId', { chatId })
      .andWhere(':userId NOT IN (seenBy.id)', { userId })
      .getMany();
    if (!messages) throw new NotFoundException('Messages not found!');

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const promises = [];
    messages.forEach((message) => {
      message.seenBy = [...message.seenBy, user];
      promises.push(this.messageRepository.save(message));
    });
    await Promise.all(promises);

    return {
      chatId,
      messages,
    };
  }

  async addMessageReaction(
    userId: number,
    { messageId, reactionName }: AddMessageReactionDto,
  ): Promise<Message> {
    const message = await this.findById(messageId, {
      relations: [
        'reactions',
        'chat',
        'author',
        'seenBy',
        'reactions.user',
        'reactions.type',
      ],
    });
    if (!message) {
      throw new NotFoundException('Message not found!');
    }

    const isValid = await this.chatService.validateMembership(
      message.chat.id,
      userId,
    );
    if (!isValid) {
      throw new ForbiddenException(
        'You can react only to messages in chats that you are member of!',
      );
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
    const message = await this.findById(messageId, { relations: ['chat'] });
    if (!message) throw new NotFoundException('Message not found!');

    const isValid = await this.chatService.validateMembership(
      message.chat.id,
      userId,
    );
    if (!isValid) {
      throw new ForbiddenException(
        'You can delete message reactions only in chats, that you are membere of!',
      );
    }

    return await this.messageReactionService.deleteByUserAndMessageIds(
      userId,
      messageId,
    );
  }
}

export default MessageService;
