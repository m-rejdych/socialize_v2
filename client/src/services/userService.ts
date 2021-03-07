import { API_URI } from '../config';
import { GetUserReq } from '../interfaces/user/userReq';
import { GetUserRes } from '../interfaces/user/userRes';
import createJwtRequest from '../util/jwtRequestFactory';

export const getUser = ({ userId }: GetUserReq): Promise<GetUserRes> =>
  createJwtRequest<GetUserRes>({
    url: `${API_URI}/user/get-user/${userId}`,
    method: 'GET',
  });

export const getMe = (): Promise<GetUserRes> =>
  createJwtRequest<GetUserRes>({
    url: `${API_URI}/user/get-me`,
    method: 'GET',
  });
