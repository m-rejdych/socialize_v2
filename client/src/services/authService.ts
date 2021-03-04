import axios, { AxiosResponse } from 'axios';

import { API_URI } from '../config';
import {
  LoginReqInterface,
  RegisterReqInterface,
} from '../interfaces/auth/requests';
import { AuthResponse } from '../interfaces/auth/responses';

export const register = (data: RegisterReqInterface): Promise<AuthResponse> =>
  axios
    .post(`${API_URI}/auth/register`, data)
    .then((res: AxiosResponse<AuthResponse>) => res)
    .catch((err) => err);

export const login = (data: LoginReqInterface): Promise<AuthResponse> =>
  axios
    .post(`${API_URI}/auth/login`, data)
    .then((res: AxiosResponse<AuthResponse>) => res)
    .catch((err) => err);
