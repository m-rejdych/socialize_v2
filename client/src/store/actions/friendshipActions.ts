import createAction from '../../util/actionFactory';
import {
  GetAllFriendshipsAction,
  GetAllFriendshipsSuccessAction,
  GetFriendshipAction,
  GetFriendshipSuccessAction,
  SetFriendshipError,
  CreateFriendshipAction,
  CreateFriendshipSuccessAction,
} from '../../interfaces/friendship/friendshipActions';
import { FRIENDSHIP } from '../../shared/constants/actionTypes';

export const getAllFriendships: GetAllFriendshipsAction = createAction(
  FRIENDSHIP.GET_ALL_FRIENDSHIPS,
);

export const getAllFriendshipsSuccess: GetAllFriendshipsSuccessAction = createAction(
  FRIENDSHIP.GET_ALL_FRIENDSHIPS_SUCCESS,
);

export const getFriendship: GetFriendshipAction = createAction(
  FRIENDSHIP.GET_FRIENDSHIP,
);

export const getFriendshipSuccess: GetFriendshipSuccessAction = createAction(
  FRIENDSHIP.GET_FRIENDSHIP_SUCCESS,
);

export const createFriendship: CreateFriendshipAction = createAction(
  FRIENDSHIP.CREATE_FRIENDSHIP,
);

export const createFriendshipSuccess: CreateFriendshipSuccessAction = createAction(
  FRIENDSHIP.CREATE_FRIENDSHIP_SUCCESS,
);

export const setFriendshipError: SetFriendshipError = createAction(
  FRIENDSHIP.ERROR,
);
