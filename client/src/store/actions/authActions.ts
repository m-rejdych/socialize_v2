import { AUTH } from '../../shared/constants/actionTypes';
import {
  RegisterAction,
  LoginAction,
  AuthSuccessAction,
  ErrorAction,
} from '../../interfaces/auth/authActions';
import createAction from '../../util/actionFactory';

export const register: RegisterAction = createAction(AUTH.REGISTER);

export const login: LoginAction = createAction(AUTH.LOGIN);

export const authSuccess: AuthSuccessAction = createAction(AUTH.SUCCESS);

export const authError: ErrorAction = createAction(AUTH.ERROR);
