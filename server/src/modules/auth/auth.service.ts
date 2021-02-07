import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserEntity from '../user/entities/user.entity';
import UserInterface from '../user/interfaces/user.interface';
import UserService from '../user/user.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import AuthResponseDto from './dto/authResponse.dto';

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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

  async register({ email, password }: RegisterDto): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByEmail(email);
    if (foundUser) throw new ConflictException('Email already in use!');

    const hashedPassword = await hash(password, 12);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

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
