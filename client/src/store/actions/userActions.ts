import {
  GetUserAction,
  GetUserSuccessAction,
  SetUserErrorAction,
} from '../../interfaces/user/userActions';
import { USER } from '../../shared/constants/actionTypes';
import createAction from '../../util/actionFactory';

export const getUser: GetUserAction = createAction(USER.GET_USER);

export const getUserSuccess: GetUserSuccessAction = createAction(
  USER.GET_USER_SUCCESS,
);

export const setUserError: SetUserErrorAction = createAction(USER.ERROR);
