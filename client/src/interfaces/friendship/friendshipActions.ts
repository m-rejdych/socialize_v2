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

export type AcceptFriendshipAction = Action<
  typeof FRIENDSHIP.ACCEPT_FRIENDSHIP,
  FriendshipPayload
>;

export type AcceptFriendshipSuccessAction = Action<
  typeof FRIENDSHIP.ACCEPT_FRIENDSHIP_SUCCESS,
  Friendship
>;

export type DeleteFriendshipAction = Action<
  typeof FRIENDSHIP.DELETE_FRIENDSHIP,
  FriendshipPayload
>;

export type DeleteFriendshipSuccessAction = Action<
  typeof FRIENDSHIP.DELETE_FRIENDSHIP_SUCCESS,
  number
>;

export type SetFriendshipError = Action<typeof FRIENDSHIP.ERROR, string | null>;
