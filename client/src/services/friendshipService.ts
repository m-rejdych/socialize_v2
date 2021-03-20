import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import {
  GetAllFriendshipsRes,
  GetFriendshipRes,
  CreateFriendshipRes,
  AcceptFriendshipRes,
  DeleteFriendshipRes,
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
): Promise<CreateFriendshipRes> =>
  createJwtRequest<CreateFriendshipRes>({
    url: `${API_URI}/friendship/create-friendship`,
    method: 'POST',
    body: data,
  });

export const acceptFriendship = (
  data: FriendshipReq,
): Promise<AcceptFriendshipRes> =>
  createJwtRequest<AcceptFriendshipRes>({
    url: `${API_URI}/friendship/accept-friendship`,
    method: 'PUT',
    body: data,
  });

export const deleteFriendship = (
  data: FriendshipReq,
): Promise<DeleteFriendshipRes> =>
  createJwtRequest({
    url: `${API_URI}/friendship/delete-friendship?friendId=${data.friendId}`,
    method: 'DELETE',
  });
