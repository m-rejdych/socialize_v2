import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import { ProfileRes } from '../interfaces/profile/profileRes';
import { UpdateUserInfoReq } from '../interfaces/profile/profileReq';

export const getUserInfo = (userId: number): Promise<ProfileRes> =>
  createJwtRequest<ProfileRes>({
    method: 'GET',
    url: `${API_URI}/user-info/get-by-user-id/${userId}`,
  });

export const updateUserInfo = (data: UpdateUserInfoReq): Promise<ProfileRes> =>
  createJwtRequest<ProfileRes>({
    method: 'PUT',
    url: `${API_URI}/user-info/update-me`,
    body: data,
  });
