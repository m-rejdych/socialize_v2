import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Put,
  Delete,
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

@Controller('message')
class MessageController {
  constructor(private messageService: MessageService) {}

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
