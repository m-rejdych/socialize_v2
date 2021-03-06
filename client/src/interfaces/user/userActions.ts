import { GetUserPayload, GetUserSuccessPayload } from './userPayloads';
import { Action } from '../store/action';
import { USER } from '../../shared/constants/actionTypes';

export type GetUserAction = Action<typeof USER.GET_USER, GetUserPayload>;

export type GetUserSuccessAction = Action<
  typeof USER.GET_USER_SUCCESS,
  GetUserSuccessPayload
>;

export type SetUserErrorAction = Action<typeof USER.ERROR, string>;
