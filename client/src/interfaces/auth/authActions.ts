import Action from '../store/action';
import { AUTH } from '../../shared/constants/actionTypes';
import {
  RegisterPayload,
  LoginPayload,
  AuthSuccessPayload,
} from './authPayloads';

export type RegisterAction = Action<typeof AUTH.REGISTER, RegisterPayload>;

export type AuthSuccessAction = Action<typeof AUTH.SUCCESS, AuthSuccessPayload>;

export type LoginAction = Action<typeof AUTH.LOGIN, LoginPayload>;

export type ErrorAction = Action<typeof AUTH.ERROR, string>;
