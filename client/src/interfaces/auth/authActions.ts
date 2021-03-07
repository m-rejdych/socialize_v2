import Action from '../store/action';
import { AUTH } from '../../shared/constants/actionTypes';
import { RegisterPayload, LoginPayload } from './authPayloads';

export type RegisterAction = Action<typeof AUTH.REGISTER, RegisterPayload>;

export type LoginAction = Action<typeof AUTH.LOGIN, LoginPayload>;

export type AutoLoginAction = Action<typeof AUTH.AUTO_LOGIN, null>;
