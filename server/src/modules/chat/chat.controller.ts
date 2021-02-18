import {
  Controller,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';

import ChatService from './chat.service';
import JwtGuard from '../../guards/jwt.guard';
import CreateChatDto from './dto/createChat.dto';

@Controller('chat')
class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtGuard)
  @Post('create-chat')
  async createChat(@Body() data: CreateChatDto) {
    if (data.type !== 'group') {
      throw new BadRequestException(
        'You can only make group chat through the controller!',
      );
    }

    return await this.chatService.createChat(data);
  }
}

export default ChatController;
