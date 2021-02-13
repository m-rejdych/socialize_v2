import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import User from '../../user/user.entity';
import AuthService from '../auth.service';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    return user;
  }
}

export default LocalStrategy;
