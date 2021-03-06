import UserState from '../../interfaces/user/userState';
import { RegisterAction, LoginAction } from '../../interfaces/auth/authActions';
import {
  GetUserAction,
  GetUserSuccessAction,
  SetUserErrorAction,
} from '../../interfaces/user/userActions';
import { AUTH, USER } from '../../shared/constants/actionTypes';
import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';

const initialState: UserState = {
  userId: 0,
  email: '',
  firstName: '',
  lastName: '',
  loading: false,
  error: null,
};

const strategyMap: StrategyMap<UserState, typeof AUTH & typeof USER> = {
  [AUTH.REGISTER]: registerTransformer,
  [AUTH.LOGIN]: loginTransformer,
  [USER.GET_USER]: getUserTransformer,
  [USER.GET_USER_SUCCESS]: getUserSuccessTransformer,
  [USER.ERROR]: setUserErrorTransformer,
};

const userReducer = createReducer<UserState, typeof AUTH>(
  strategyMap,
  initialState,
);

function registerTransformer(
  state: UserState,
  _: ReturnType<RegisterAction>,
): UserState {
  return { ...state, loading: true };
}

function loginTransformer(
  state: UserState,
  _: ReturnType<LoginAction>,
): UserState {
  return { ...state, loading: true };
}

function getUserTransformer(
  state: UserState,
  _: ReturnType<GetUserAction>,
): UserState {
  return { ...state, loading: true };
}

function getUserSuccessTransformer(
  state: UserState,
  { payload }: ReturnType<GetUserSuccessAction>,
): UserState {
  return { ...state, ...payload, loading: false };
}

function setUserErrorTransformer(
  state: UserState,
  { payload }: ReturnType<SetUserErrorAction>,
): UserState {
  return { ...state, error: payload, loading: false };
}

export default userReducer;
