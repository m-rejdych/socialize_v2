import { Request } from 'express';

interface JwtRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

export default JwtRequest;
