import createJwtRequest from '../util/jwtRequestFactory';
import { GetMyNotificationsReq } from '../interfaces/notification/notificationReq';
import { GetMyNotificationsRes } from '../interfaces/notification/notificationRes';
import { API_URI } from '../config';

export const getMyNotifications = (
  options?: GetMyNotificationsReq,
): Promise<GetMyNotificationsRes> =>
  createJwtRequest<GetMyNotificationsRes>({
    method: 'GET',
    url: `${API_URI}/notification/get-my-notifications${
      options
        ? `?${options.take ? `take=${options.take}` : ''}${
            options.skip ? `skip=${options.skip}` : ''
          }`
        : ''
    }`,
  });
