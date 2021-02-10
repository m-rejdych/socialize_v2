import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import AuthService from './auth.service';
import RegisterDto from './dto/register.dto';
import AuthResponseDto from './dto/authResponse.dto';
import LocalAuthGuard from './guards/local.guard';
import LocalRequest from './interfaces/localRequest.interface';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<AuthResponseDto> {
    return await this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: LocalRequest) {
    const { user } = req;

    if (!user) throw new UnauthorizedException();

    return this.authService.login({ email: user.email, id: user.id });
  }
}

export default AuthController;
