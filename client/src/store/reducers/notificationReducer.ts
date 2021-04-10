import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';
import NotificationState from '../../interfaces/notification/notificationState';
import { NOTIFICATION } from '../../shared/constants/actionTypes';
import {
  GetMyNotificationsAction,
  GetMyNotificationsSuccessAction,
  SetNotificationErrorAction,
} from '../../interfaces/notification/notificationActions';

const initialState: NotificationState = {
  notifications: [],
  notSeenNotificationsCount: 0,
  loading: false,
  skip: 0,
  notificationsLoading: false,
  error: null,
};

const strategyMap: StrategyMap<NotificationState, typeof NOTIFICATION> = {
  [NOTIFICATION.GET_MY_NOTIFICATIONS]: getMyNotificationsTransformer,
  [NOTIFICATION.GET_MY_NOTIFICATIONS_SUCCESS]: getMyNotificationsSuccessTransformer,
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
  return { ...state, loading: false, error: null, notifications: payload };
}

function setNotificationErrorTransformer(
  state: NotificationState,
  { payload }: ReturnType<SetNotificationErrorAction>,
): NotificationState {
  return { ...state, loading: false, error: payload };
}

export default notificationReducer;
