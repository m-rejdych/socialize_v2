export const AUTH = {
  REGISTER: 'AUTH_REGISTER' as const,
  LOGIN: 'AUTH_LOGIN' as const,
  AUTO_LOGIN: 'AUTH_AUTO_LOGIN' as const,
};

export const USER = {
  GET_USER: 'USER_GET_USER' as const,
  GET_USER_SUCCESS: 'USER_GET_USER_SUCCESS' as const,
  ERROR: 'USER_ERROR' as const,
};

export const DASHBOARD = {
  SET_NAVIGATION_ITEM: 'DASHBOARD_SET_NAVIGATION_ITEM' as const,
};

export const PROFILE = {
  GET_USER_INFO: 'PROFILE_GET_USER_INFO' as const,
  GET_USER_INFO_SUCCESS: 'PROFILE_GET_USER_INFO_SUCCESS' as const,
  UPDATE_USER_INFO: 'PROFILE_UPDATE_USER_INFO' as const,
  UPDATE_USER_INFO_SUCCESS: 'PROFILE_UPDATE_USER_INFO_SUCCESS' as const,
  ERROR: 'PROFILE_ERROR' as const,
};

export const FRIENDSHIP = {
  GET_ALL_FRIENDSHIPS: 'FRIENDSHIP_GET_ALL_FRIENDSHIPS' as const,
  GET_ALL_FRIENDSHIPS_SUCCESS: 'FRIENDSHIP_GET_ALL_FRIENDSHIPS_SUCCESS' as const,
  GET_FRIENDSHIP: 'FRIENDSHIP_GET_FRIENDSHIP' as const,
  GET_FRIENDSHIP_SUCCESS: 'FRIENDSHIP_GET_FRIENDSHIP_SUCCESS' as const,
  CREATE_FRIENDSHIP: 'FRIENDSHIP_CREATE_FRIENDSHIP' as const,
  CREATE_FRIENDSHIP_SUCCESS: 'FRIENDSHIP_CREATE_FRIENDSHIP_SUCCESS' as const,
  ACCEPT_FRIENDSHIP: 'FRIENDSHIP_ACCEPT_FRIENDSHIP' as const,
  ACCEPT_FRIENDSHIP_SUCCESS: 'FRIENDSHIP_ACCEPT_FRIENDSHIP_SUCCESS' as const,
  DELETE_FRIENDSHIP: 'FRIENDSHIP_DELETE_FRIENDSHIP' as const,
  DELETE_FRIENDSHIP_SUCCESS: 'FRIENDSHIP_DELETE_FRIENDSHIP_SUCCESS' as const,
  ERROR: 'FRIENDSHIP_ERROR' as const,
};

export const POST = {
  CREATE_POST: 'POST_CREATE_POST' as const,
  CREATE_POST_SUCCESS: 'POST_CREATE_POST_SUCCESS' as const,
  GET_FEED: 'POST_GET_FEED' as const,
  GET_FEED_SUCCESS: 'POST_GET_FEED_SUCCESS' as const,
  UPDATE_POST: 'POST_UPDATE_POST' as const,
  UPDATE_POST_SUCCESS: 'POST_UPDATE_POST_SUCCESS' as const,
  ERROR: 'POST_ERROR' as const,
};
