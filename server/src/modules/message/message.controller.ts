import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Put,
  Delete,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import MessageService from './message.service';
import Message from './message.entity';
import CreateMessageDto from './dto/createMessage.dto';
import AddMessageReactionDto from './dto/addMessageReaction.dto';
import DeleteReactionResponseDto from '../messageReaction/dto/deleteReaction.dto';
import MarkAsSeenDto from './dto/markAsSeen.dto';
import MarkAllAsSeenDto from './dto/markAllAsSeen.dto';
import MarkAllAsSeenResponseDto from './dto/markAllAsSeenResponse.dto';
import FindAllByChadIdOptionsDto from './dto/findAllByChatIdOptions.dto';

@Controller('message')
class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtGuard)
  @Get('get-by-chat-id')
  async getByChatId(
    @Query('chatId', ParseIntPipe) chatId: number,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
  ): Promise<Message[]> {
    const options: FindAllByChadIdOptionsDto = {};

    if (!isNaN(take)) options.take = Number(take);
    if (!isNaN(skip)) options.skip = Number(skip);

    return await this.messageService.findAllByChatId(chatId, options);
  }

  @UseGuards(JwtGuard)
  @Get('get-count-by-chat-id')
  async getCountByChatId(
    @Query('chatId', ParseIntPipe) chatId: number,
  ): Promise<number> {
    return await this.messageService.getMessagesCountByChatId(chatId);
  }

  @UseGuards(JwtGuard)
  @Post('create-message')
  async createMessage(
    @Body() data: CreateMessageDto,
    @Req() req: JwtRequest,
  ): Promise<Message> {
    const { id } = req.user;

    return await this.messageService.createMessage(id, data);
  }

  @UseGuards(JwtGuard)
  @Put('mark-as-seen')
  async markAsSeen(
    @Body() { messageId }: MarkAsSeenDto,
    @Req() req: JwtRequest,
  ): Promise<Message> {
    const { id } = req.user;

    return await this.messageService.markAsSeen(id, messageId);
  }

  @UseGuards(JwtGuard)
  @Put('mark-all-as-seen')
  async markAllAsSeen(
    @Body() { chatId }: MarkAllAsSeenDto,
    @Req() req: JwtRequest,
  ): Promise<MarkAllAsSeenResponseDto> {
    const { id } = req.user;

    return await this.messageService.markAllAsSeen(id, chatId);
  }

  @UseGuards(JwtGuard)
  @Put('add-reaction')
  async addMessageReaction(
    @Body() data: AddMessageReactionDto,
    @Req() req: JwtRequest,
  ): Promise<Message> {
    const { id } = req.user;

    return await this.messageService.addMessageReaction(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-reaction')
  async deleteMessageReaction(
    @Query('messageId', ParseIntPipe) messageId: number,
    @Req() req: JwtRequest,
  ): Promise<DeleteReactionResponseDto> {
    const { id } = req.user;

    return await this.messageService.deleteMessageReaction(id, messageId);
  }
}

export default MessageController;
