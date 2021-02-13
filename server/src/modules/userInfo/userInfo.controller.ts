import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import UserInfoInterface from './interfaces/userInfo.interface';
import JwtGuard from '../../guards/jwt.guard';
import UserInfoService from './userInfo.service';

@Controller('user-info')
class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @UseGuards(JwtGuard)
  @Get('get-by-user-id/:id')
  async getByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserInfoInterface> {
    return await this.userInfoService.getByUserId(id);
  }
}

export default UserInfoController;
