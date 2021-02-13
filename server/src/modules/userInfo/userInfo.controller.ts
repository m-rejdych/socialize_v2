import {
  Controller,
  Get,
  Put,
  UseGuards,
  UsePipes,
  Param,
  Body,
  Req,
  ParseIntPipe,
} from '@nestjs/common';

import UserInfoInterface from './interfaces/userInfo.interface';
import JwtGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import UserInfoService from './userInfo.service';
import UpdateUserInfoDto from './dto/updateUserInfo.dto';
import CapitalizationPipe from '../../pipes/capitalization.pipe';

@Controller('user-info')
class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @UseGuards(JwtGuard)
  @Get('get-me')
  async getMe(@Req() req: JwtRequest): Promise<UserInfoInterface> {
    const { id } = req.user;

    return await this.userInfoService.getByUserId(id);
  }

  @UseGuards(JwtGuard)
  @Get('get-by-user-id/:id')
  async getByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserInfoInterface> {
    return await this.userInfoService.getByUserId(id);
  }

  @UseGuards(JwtGuard)
  @UsePipes(CapitalizationPipe)
  @Put('update-me')
  async updateMe(@Body() data: UpdateUserInfoDto, @Req() req: JwtRequest) {
    const { id } = req.user;

    return await this.userInfoService.updateByUserId(id, data);
  }
}

export default UserInfoController;
