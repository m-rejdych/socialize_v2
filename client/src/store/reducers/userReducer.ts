import UserState from '../../interfaces/user/userState';
import { RegisterAction, LoginAction } from '../../interfaces/auth/authActions';
import { AUTH } from '../../shared/constants/actionTypes';
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

const strategyMap: StrategyMap<UserState, typeof AUTH> = {
  [AUTH.REGISTER]: registerTransformer,
  [AUTH.LOGIN]: loginTransformer,
};

const userReducer = createReducer<UserState, typeof AUTH>(
  strategyMap,
  initialState,
);

function registerTransformer(state: UserState, _: ReturnType<RegisterAction>) {
  return { ...state, loading: true };
}

function loginTransformer(state: UserState, _: ReturnType<LoginAction>) {
  return { ...state, loading: true };
}

export default userReducer;
