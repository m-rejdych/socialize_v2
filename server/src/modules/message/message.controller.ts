import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import MessageService from './message.service';
import Message from './message.entity';
import CreateMessageDto from './dto/createMessage.dto';

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
}

export default MessageController;
