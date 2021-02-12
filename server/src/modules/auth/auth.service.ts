import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import UserInterface from '../user/interfaces/user.interface';
import UserService from '../user/user.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import AuthResponseDto from './dto/authResponse.dto';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserInterface> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found!');

    const isValid = await compare(password, user.password);

    if (isValid) return user;

    throw new UnauthorizedException('Wrong email or password!');
  }

  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const { email } = data;

    const user = await this.userService.createUser(data);

    const token = this.jwtService.sign({ email, id: user.id });

    return { userId: user.id, token };
  }

  login({ email, id }: LoginDto): AuthResponseDto {
    const token = this.jwtService.sign({ email, id });

    return {
      userId: id,
      token,
    };
  }
}

export default AuthService;
