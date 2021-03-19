import Action from '../store/action';
import Friendship from './friendship';
import { FRIENDSHIP } from '../../shared/constants/actionTypes';
import { FriendshipPayload } from './friendshipPayloads';

export type GetAllFriendshipsAction = Action<
  typeof FRIENDSHIP.GET_ALL_FRIENDSHIPS,
  null
>;

export type GetAllFriendshipsSuccessAction = Action<
  typeof FRIENDSHIP.GET_ALL_FRIENDSHIPS_SUCCESS,
  Friendship[]
>;

export type GetFriendshipAction = Action<
  typeof FRIENDSHIP.GET_FRIENDSHIP,
  number
>;

export type GetFriendshipSuccessAction = Action<
  typeof FRIENDSHIP.GET_FRIENDSHIP_SUCCESS,
  Friendship | null
>;

export type CreateFriendshipAction = Action<
  typeof FRIENDSHIP.CREATE_FRIENDSHIP,
  FriendshipPayload
>;

export type CreateFriendshipSuccessAction = Action<
  typeof FRIENDSHIP.CREATE_FRIENDSHIP_SUCCESS,
  Friendship
>;

export type SetFriendshipError = Action<typeof FRIENDSHIP.ERROR, string | null>;
