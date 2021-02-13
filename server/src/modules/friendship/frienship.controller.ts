import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import Friendship from './friendship.entity';
import FriendshipService from './frienship.service';
import CreateFriendshipDto from './dto/createFriendship.dto';
import DeleteFriendshipReponseDto from './dto/deleteFriendshipResponse.dto';

@Controller('friendship')
class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @UseGuards(JwtGuard)
  @Get('get-by-friend-id')
  async findOneByFriendId(
    @Query('friendId', ParseIntPipe) friendId: number,
    @Req() req: JwtRequest,
  ): Promise<Friendship | null> {
    const { id } = req.user;

    return await this.friendshipService.findOne(id, friendId);
  }

  @UseGuards(JwtGuard)
  @Post('create-friendship')
  async createFriendship(
    @Body() { friendId }: CreateFriendshipDto,
    @Req() req: JwtRequest,
  ): Promise<Friendship> {
    const { id } = req.user;

    return await this.friendshipService.createFriendship(id, friendId);
  }

  @UseGuards(JwtGuard)
  @Put('accept-friendship')
  async acceptFriendship(
    @Body() { friendId }: CreateFriendshipDto,
    @Req() req: JwtRequest,
  ): Promise<Friendship> {
    const { id } = req.user;

    return await this.friendshipService.acceptFriendship(id, friendId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-friendship')
  async deleteFriendship(
    @Query('friendId', ParseIntPipe) friendId: number,
    @Req() req: JwtRequest,
  ): Promise<DeleteFriendshipReponseDto> {
    const { id } = req.user;

    return await this.friendshipService.deleteFriendship(id, friendId);
  }
}

export default FriendshipController;
