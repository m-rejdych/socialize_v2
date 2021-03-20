import Action from '../store/action';
import Profile from './profile';
import { PROFILE } from '../../shared/constants/actionTypes';
import { UpdateProfilePayload } from './profilePayloads';

export type GetUserInfoAction = Action<typeof PROFILE.GET_USER_INFO, number>;

export type GetUserInfoSuccessAction = Action<
  typeof PROFILE.GET_USER_INFO_SUCCESS,
  Profile
>;

export type UpdateUserInfoAction = Action<
  typeof PROFILE.UPDATE_USER_INFO,
  UpdateProfilePayload
>;

export type UpdateUserInfoSuccessAction = Action<
  typeof PROFILE.UPDATE_USER_INFO_SUCCESS,
  Profile
>;

export type SetProfileErrorAction = Action<typeof PROFILE.ERROR, string | null>;
