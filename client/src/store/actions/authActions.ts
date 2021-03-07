import { AUTH } from '../../shared/constants/actionTypes';
import {
  RegisterAction,
  LoginAction,
  AutoLoginAction,
} from '../../interfaces/auth/authActions';
import createAction from '../../util/actionFactory';

export const register: RegisterAction = createAction(AUTH.REGISTER);

export const login: LoginAction = createAction(AUTH.LOGIN);

export const autoLogin: AutoLoginAction = createAction(AUTH.AUTO_LOGIN);
