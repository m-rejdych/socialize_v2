import { Request } from 'express';
import UserInterface from '../../user/interfaces/user.interface';

interface LocalRequest extends Request {
  user: UserInterface;
}

export default LocalRequest;
