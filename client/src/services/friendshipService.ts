import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import {
  GetAllFriendshipsRes,
  GetFriendshipRes,
} from '../interfaces/friendship/friendshipRes';
import { FriendshipReq } from '../interfaces/friendship/friendshipReq';

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

export const createFriendship = (
  data: FriendshipReq,
): Promise<GetFriendshipRes> =>
  createJwtRequest<GetFriendshipRes>({
    url: `${API_URI}/friendship/create-friendship`,
    method: 'POST',
    body: data,
  });
