import User from '../user';

export interface GetUserPayload {
  userId?: number;
}

export interface GetUserSuccessPayload extends User {}
