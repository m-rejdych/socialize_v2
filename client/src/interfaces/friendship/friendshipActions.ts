import Action from '../store/action';
import { FRIENDSHIP } from '../../shared/constants/actionTypes';
import { GetAllFriendshipsSuccessPayload } from './friendshipPayloads';

export type GetAllFriendshipsAction = Action<
  typeof FRIENDSHIP.GET_ALL_FRIENDSHIPS,
  null
>;

export type GetAllFriendshipsSuccessAction = Action<
  typeof FRIENDSHIP.GET_ALL_FRIENDSHIPS_SUCCESS,
  GetAllFriendshipsSuccessPayload
>;

export type SetFriendshipError = Action<typeof FRIENDSHIP.ERROR, string | null>;
