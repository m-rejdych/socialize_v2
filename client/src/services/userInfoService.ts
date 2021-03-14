import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import { GetProfileRes } from '../interfaces/profile/profileRes';

export const getUserInfo = (userId: number): Promise<GetProfileRes> =>
  createJwtRequest<GetProfileRes>({
    method: 'GET',
    url: `${API_URI}/user-info/get-by-user-id/${userId}`,
  });
