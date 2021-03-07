import axios from 'axios';

import { API_URI } from '../config';
import {
  LoginReqInterface,
  RegisterReqInterface,
} from '../interfaces/auth/authReq';
import { AuthResponse } from '../interfaces/auth/authRes';

export const register = (data: RegisterReqInterface): Promise<AuthResponse> =>
  axios.post(`${API_URI}/auth/register`, data);

export const login = (data: LoginReqInterface): Promise<AuthResponse> =>
  axios.post(`${API_URI}/auth/login`, data);
