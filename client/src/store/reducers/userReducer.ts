import UserState from '../../interfaces/user/userState';
import {
  RegisterAction,
  LoginAction,
  AutoLoginAction,
  LogoutAction,
} from '../../interfaces/auth/authActions';
import {
  GetUserAction,
  GetUserSuccessAction,
  SetUserErrorAction,
} from '../../interfaces/user/userActions';
import { AUTH, USER } from '../../shared/constants/actionTypes';
import createReducer from '../../util/reducerFactory';
import StrategyMap from '../../interfaces/store/strategyMap';

const initialState: UserState = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  loading: false,
  initialLoad: false,
  error: null,
};

const strategyMap: StrategyMap<UserState, typeof AUTH & typeof USER> = {
  [AUTH.REGISTER]: registerTransformer,
  [AUTH.LOGIN]: loginTransformer,
  [AUTH.LOGOUT]: logoutTransformer,
  [AUTH.AUTO_LOGIN]: autoLoginTransformer,
  [USER.GET_USER]: getUserTransformer,
  [USER.GET_USER_SUCCESS]: getUserSuccessTransformer,
  [USER.ERROR]: setUserErrorTransformer,
};

const userReducer = createReducer(strategyMap, initialState);

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

function logoutTransformer(
  state: UserState,
  _: ReturnType<LogoutAction>,
): UserState {
  return { ...state, initialLoad: true };
}

function autoLoginTransformer(
  state: UserState,
  action: ReturnType<AutoLoginAction>,
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
  return {
    ...state,
    ...payload,
    loading: false,
    initialLoad: true,
    error: null,
  };
}

function setUserErrorTransformer(
  state: UserState,
  { payload }: ReturnType<SetUserErrorAction>,
): UserState {
  return { ...state, error: payload, loading: false, initialLoad: true };
}

export default userReducer;
