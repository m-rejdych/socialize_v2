import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import { GetAllFriendshipsRes } from '../interfaces/friendship/friendshipRes';

export const getAllFriends = (): Promise<GetAllFriendshipsRes> =>
  createJwtRequest<GetAllFriendshipsRes>({
    method: 'GET',
    url: `${API_URI}/friendship/get-all`,
  });
