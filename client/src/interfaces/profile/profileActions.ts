import Action from '../store/action';
import { PROFILE } from '../../shared/constants/actionTypes';
import {
  GetUserInfoPayload,
  GetUserInfoSuccessPayload,
} from './profilePayloads';

export type GetUserInfoAction = Action<
  typeof PROFILE.GET_USER_INFO,
  GetUserInfoPayload
>;

export type GetUserInfoSuccessAction = Action<
  typeof PROFILE.GET_USER_INFO_SUCCESS,
  GetUserInfoSuccessPayload
>;

export type SetProfileErrorAction = Action<typeof PROFILE.ERROR, string>;
