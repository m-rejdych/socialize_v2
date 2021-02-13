import { Request } from 'express';
import User from '../../user/user.entity';

interface LocalRequest extends Request {
  user: User;
}

export default LocalRequest;
