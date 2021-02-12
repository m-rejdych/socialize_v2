import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import JwtAuthGuard from '../../guards/jwt.guard';
import JwtRequest from '../auth/interfaces/jwtRequest.interface';
import UserInterface from './interfaces/user.interface';
import UserService from './user.service';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('get-me')
  async getMe(@Req() req: JwtRequest): Promise<UserInterface> {
    return await this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('get-user/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserInterface> {
    return await this.userService.findById(id);
  }
}

export default UserController;
