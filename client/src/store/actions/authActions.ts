import { AUTH } from '../../shared/constants/actionTypes';
import { RegisterAction, LoginAction } from '../../interfaces/auth/authActions';
import createAction from '../../util/actionFactory';

export const register: RegisterAction = createAction(AUTH.REGISTER);

export const login: LoginAction = createAction(AUTH.LOGIN);
