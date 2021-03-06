import axios from 'axios';

import { API_URI } from '../config';
import { GetUserReq } from '../interfaces/user/userReq';
import { GetUserRes } from '../interfaces/user/userRes';

export const getUser = ({ userId, token }: GetUserReq): Promise<GetUserRes> =>
  axios
    .get(`${API_URI}/user/get-user${userId ? `/${userId}` : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
