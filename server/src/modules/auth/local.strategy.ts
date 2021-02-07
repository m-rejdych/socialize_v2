import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import UserInterface from '../user/interfaces/user.interface';
import AuthService from './auth.service';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserInterface> {
    const user = await this.authService.validateUser(email, password);

    return user;
  }
}

export default LocalStrategy;
