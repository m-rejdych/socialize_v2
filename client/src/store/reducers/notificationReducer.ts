import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';
import NotificationState from '../../interfaces/notification/notificationState';
import { NOTIFICATION } from '../../shared/constants/actionTypes';
import {
  GetMyNotificationsAction,
  GetMyNotificationsSuccessAction,
  GetNotSeenNotificationsCountAction,
  GetNotSeenNotificationsCountSuccessAction,
  AddNotificationAction,
  HideNewNotificationAction,
  SetNotificationErrorAction,
  MarkAsSeenByIdSuccessAction,
  ResetNotificationsAction,
} from '../../interfaces/notification/notificationActions';

const initialState: NotificationState = {
  open: false,
  notifications: null,
  newNotifications: null,
  notSeenNotificationsCount: 0,
  loading: false,
  skip: 0,
  notificationsLoading: false,
  error: null,
};

const strategyMap: StrategyMap<NotificationState, typeof NOTIFICATION> = {
  [NOTIFICATION.GET_MY_NOTIFICATIONS]: getMyNotificationsTransformer,
  [NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS]: getMyNotificationsSuccessTransformer,
  [NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT]: getNotSeenNotificationsCountTransformer,
  [NOTIFICATION.GET_NOT_SEEN_NOTIFICATIONS_COUNT_SUCCESS]: getNotSeenNotificationsCountSuccessTransformer,
  [NOTIFICATION.ADD_NOTIFICATION]: addNotificationTransformer,
  [NOTIFICATION.HIDE_NEW_NOTIFICATION]: hideNewNotificationTransformer,
  [NOTIFICATION.RESET_NOTIFICATIONS]: resetNotificationsTransformer,
  [NOTIFICATION.MARK_AS_SEEN_BY_ID]: markAsSeenByIdSuccessTransformer,
  [NOTIFICATION.ERROR]: setNotificationErrorTransformer,
};

const notificationReducer = createReducer(strategyMap, initialState);

function getMyNotificationsTransformer(
  state: NotificationState,
  _: ReturnType<GetMyNotificationsAction>,
): NotificationState {
  return { ...state, loading: true };
}

function getMyNotificationsSuccessTransformer(
  state: NotificationState,
  { payload }: ReturnType<GetMyNotificationsSuccessAction>,
): NotificationState {
  return {
    ...state,
    loading: false,
    error: null,
    open: true,
    notifications: state.notifications
      ? [...state.notifications, ...payload]
      : payload,
    newNotifications: null,
    notSeenNotificationsCount: 0,
    skip: state.skip + 20,
  };
}

function getNotSeenNotificationsCountTransformer(
  state: NotificationState,
  _: ReturnType<GetNotSeenNotificationsCountAction>,
): NotificationState {
  return { ...state, loading: true };
}

function getNotSeenNotificationsCountSuccessTransformer(
  state: NotificationState,
  { payload }: ReturnType<GetNotSeenNotificationsCountSuccessAction>,
): NotificationState {
  return {
    ...state,
    loading: false,
    error: null,
    notSeenNotificationsCount: payload,
  };
}

function addNotificationTransformer(
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
    skip: state.skip + 1,
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
  _: NotificationState,
  __: ReturnType<ResetNotificationsAction>,
): NotificationState {
  return initialState;
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

function setNotificationErrorTransformer(
  state: NotificationState,
  { payload }: ReturnType<SetNotificationErrorAction>,
): NotificationState {
  return { ...state, loading: false, error: payload };
}

export default notificationReducer;
