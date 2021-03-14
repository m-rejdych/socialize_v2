import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import {
  GetAllFriendshipsRes,
  GetFriendshipRes,
} from '../interfaces/friendship/friendshipRes';

export const getAllFriends = (): Promise<GetAllFriendshipsRes> =>
  createJwtRequest<GetAllFriendshipsRes>({
    method: 'GET',
    url: `${API_URI}/friendship/get-all`,
  });

export const getFriendship = (friendId: number): Promise<GetFriendshipRes> =>
  createJwtRequest<GetFriendshipRes>({
    method: 'GET',
    url: `${API_URI}/friendship/get-by-friend-id?friendId=${friendId}`,
  });
