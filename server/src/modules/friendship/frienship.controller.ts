import { Controller, Get, UseGuards } from '@nestjs/common';

import JwtGuard from '../../guards/jwt.guard';

@Controller('friendship')
class FriendshipController {
  @UseGuards(JwtGuard)
  @Get('get-by-friend-id')
  findOneByFriendId() {}
}

export default FriendshipController;
