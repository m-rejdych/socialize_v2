import Action from '../store/action';
import Friendship from './friendship';
import { FRIENDSHIP } from '../../shared/constants/actionTypes';

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

export type getFriendshipSuccessAction = Action<
  typeof FRIENDSHIP.GET_FRIENDSHIP_SUCCESS,
  Friendship | null
>;

export type SetFriendshipError = Action<typeof FRIENDSHIP.ERROR, string | null>;
