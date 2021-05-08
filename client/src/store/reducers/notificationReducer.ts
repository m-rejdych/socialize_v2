import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';
import NotificationState from '../../interfaces/notification/notificationState';
import { NOTIFICATION } from '../../shared/constants/actionTypes';
import {
  GetMyNotificationsAction,
  GetMyNotificationsSuccessAction,
  GetNotificationsCountAction,
  GetNotificationsCountSuccessAction,
  AddNotificationAction,
  HideNewNotificationAction,
  SetNotificationErrorAction,
  MarkAsSeenByIdSuccessAction,
  SetSkipAction,
  ResetNotificationsAction,
} from '../../interfaces/notification/notificationActions';

const initialState: NotificationState = {
  open: false,
  notifications: null,
  newNotifications: null,
  notificationsCount: 0,
  notSeenNotificationsCount: 0,
  loading: false,
  skip: 0,
  notificationsLoading: false,
  error: null,
};

const strategyMap: StrategyMap<NotificationState, typeof NOTIFICATION> = {
  [NOTIFICATION.GET_MY_NOTIFICATIONS]: getMyNotificationsTransformer,
  [NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS]: getMyNotificationsSuccessTransformer,
  [NOTIFICATION.GET_NOTIFICATIONS_COUNT]: getNotificationsCountTransformer,
  [NOTIFICATION.GET_NOTIFICATIONS_COUNT_SUCCESS]: getNotificationsCountSuccessTransformer,
  [NOTIFICATION.ADD_NOTIFICATION_SUCCESS]: addNotificationSuccessTransformer,
  [NOTIFICATION.HIDE_NEW_NOTIFICATION]: hideNewNotificationTransformer,
  [NOTIFICATION.RESET_NOTIFICATIONS]: resetNotificationsTransformer,
  [NOTIFICATION.MARK_AS_SEEN_BY_ID]: markAsSeenByIdSuccessTransformer,
  [NOTIFICATION.SET_SKIP]: setSkipTransformer,
  [NOTIFICATION.ERROR]: setNotificationErrorTransformer,
};

const notificationReducer = createReducer(strategyMap, initialState);

function getMyNotificationsTransformer(
  state: NotificationState,
  _: ReturnType<GetMyNotificationsAction>,
): NotificationState {
  return { ...state, notificationsLoading: true };
}

function getMyNotificationsSuccessTransformer(
  state: NotificationState,
  { payload }: ReturnType<GetMyNotificationsSuccessAction>,
): NotificationState {
  return {
    ...state,
    notificationsLoading: false,
    error: null,
    open: true,
    notifications: state.notifications
      ? [...state.notifications, ...payload]
      : payload,
    newNotifications: null,
    notSeenNotificationsCount: 0,
  };
}

function getNotificationsCountTransformer(
  state: NotificationState,
  _: ReturnType<GetNotificationsCountAction>,
): NotificationState {
  return { ...state, loading: true };
}

function getNotificationsCountSuccessTransformer(
  state: NotificationState,
  {
    payload: { notificationsCount, notSeenNotificationsCount },
  }: ReturnType<GetNotificationsCountSuccessAction>,
): NotificationState {
  return {
    ...state,
    loading: false,
    error: null,
    notificationsCount,
    notSeenNotificationsCount,
  };
}

function addNotificationSuccessTransformer(
  state: NotificationState,
  { payload }: ReturnType<AddNotificationAction>,
): NotificationState {
  return {
    ...state,
    notifications: state.notifications
      ? [payload, ...state.notifications]
      : [payload],
    newNotifications: state.newNotifications
      ? [payload.id, ...state.newNotifications]
      : [payload.id],
    notSeenNotificationsCount: state.open
      ? 0
      : state.notSeenNotificationsCount + 1,
    notificationsCount: state.notificationsCount + 1,
  };
}

function hideNewNotificationTransformer(
  state: NotificationState,
  { payload }: ReturnType<HideNewNotificationAction>,
): NotificationState {
  return {
    ...state,
    newNotifications: state.newNotifications
      ? state.newNotifications.filter((id) => id !== payload)
      : null,
  };
}

function resetNotificationsTransformer(
  state: NotificationState,
  __: ReturnType<ResetNotificationsAction>,
): NotificationState {
  return { ...initialState, notificationsCount: state.notificationsCount };
}

function markAsSeenByIdSuccessTransformer(
  state: NotificationState,
  { payload }: ReturnType<MarkAsSeenByIdSuccessAction>,
): NotificationState {
  return {
    ...state,
    notifications: state.notifications
      ? state.notifications.map((notification) =>
          notification.id === payload.id
            ? { ...notification, seen: true }
            : notification,
        )
      : null,
    notSeenNotificationsCount: state.notSeenNotificationsCount - 1,
  };
}

function setSkipTransformer(
  state: NotificationState,
  { payload }: ReturnType<SetSkipAction>,
): NotificationState {
  return { ...state, skip: payload };
}

function setNotificationErrorTransformer(
  state: NotificationState,
  { payload }: ReturnType<SetNotificationErrorAction>,
): NotificationState {
  return { ...state, loading: false, error: payload };
}

export default notificationReducer;
