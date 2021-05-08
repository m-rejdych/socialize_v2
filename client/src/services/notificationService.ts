import createJwtRequest from '../util/jwtRequestFactory';
import {
  GetMyNotificationsReq,
  MarkAsSeenByIdReq,
} from '../interfaces/notification/notificationReq';
import {
  GetMyNotificationsRes,
  GetNotificationsCountRes,
  MarkAsSeenByIdRes,
} from '../interfaces/notification/notificationRes';
import { API_URI } from '../config';

export const getMyNotifications = (
  options?: GetMyNotificationsReq,
): Promise<GetMyNotificationsRes> =>
  createJwtRequest<GetMyNotificationsRes>({
    method: 'GET',
    url: `${API_URI}/notification/get-my-notifications${
      options
        ? `?${options.take ? `take=${options.take}` : ''}${
            options.skip ? `&skip=${options.skip}` : ''
          }`
        : ''
    }`,
  });

export const getNotificationsCount = (): Promise<GetNotificationsCountRes> =>
  createJwtRequest({
    method: 'GET',
    url: `${API_URI}/notification/get-notifications-count`,
  });

export const getNotSeenNotificationsCount = (): Promise<GetNotificationsCountRes> =>
  createJwtRequest<GetNotificationsCountRes>({
    method: 'GET',
    url: `${API_URI}/notification/get-not-seen-notifications-count`,
  });

export const markAllAsSeen = (): Promise<GetMyNotificationsRes> =>
  createJwtRequest<GetMyNotificationsRes>({
    method: 'PUT',
    url: `${API_URI}/notification/mark-all-as-seen`,
  });

export const markAsSeenById = (
  data: MarkAsSeenByIdReq,
): Promise<MarkAsSeenByIdRes> =>
  createJwtRequest<MarkAsSeenByIdRes>({
    method: 'PUT',
    url: `${API_URI}/notification/mark-as-seen-by-id`,
    body: data,
  });
