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
  ERROR: 'PROFILE_ERROR' as const,
};
