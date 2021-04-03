import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Req,
  BadRequestException,
  ForbiddenException,
  Put,
} from '@nestjs/common';

import Chat from './chat.entity';
import ChatService from './chat.service';
import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import CreateChatDto from './dto/createChat.dto';
import UpdateChatNameDto from './dto/updateChatName.dto';

@Controller('chat')
class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtGuard)
  @Get('get-chat/:id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: JwtRequest,
  ): Promise<Chat> {
    const { id: userId } = req.user;

    // DELETE RELATIONS OTHER THAN MEMBERS LATER
    return await this.chatService.findById(id, {
      validateMembership: true,
      validationId: userId,
      relations: ['members', 'type'],
    });
  }

  @UseGuards(JwtGuard)
  @Get('get-chats')
  async getByUserId(@Req() req: JwtRequest): Promise<Chat[] | null> {
    const { id } = req.user;

    return await this.chatService.findByUserId(id);
  }

  @UseGuards(JwtGuard)
  @Post('create-chat')
  async createChat(@Body() data: CreateChatDto): Promise<Chat | null> {
    if (data.type !== 'group') {
      throw new BadRequestException(
        'You can only make group chat through the controller!',
      );
    }

    return await this.chatService.createChat(data);
  }

  @UseGuards(JwtGuard)
  @Put('update-chat-name')
  async updateChatName(
    @Req() req: JwtRequest,
    @Body() data: UpdateChatNameDto,
  ): Promise<Chat> {
    const { id } = req.user;

    return await this.chatService.updateChatNameById(id, data);
  }
}

export default ChatController;
