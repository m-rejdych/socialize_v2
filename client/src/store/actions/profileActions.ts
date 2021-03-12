import createAction from '../../util/actionFactory';
import { PROFILE } from '../../shared/constants/actionTypes';
import {
  GetUserInfoAction,
  GetUserInfoSuccessAction,
  SetProfileErrorAction,
} from '../../interfaces/profile/profileActions';

export const getUserInfo: GetUserInfoAction = createAction(
  PROFILE.GET_USER_INFO,
);

export const getUserInfoSuccess: GetUserInfoSuccessAction = createAction(
  PROFILE.GET_USER_INFO_SUCCESS,
);

export const setProfileError: SetProfileErrorAction = createAction(
  PROFILE.ERROR,
);
