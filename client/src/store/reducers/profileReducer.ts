import ProfileState from '../../interfaces/profile/profileState';
import { PROFILE } from '../../shared/constants/actionTypes';
import {
  GetUserInfoAction,
  GetUserInfoSuccessAction,
  SetProfileErrorAction,
} from '../../interfaces/profile/profileActions';
import StrategyMap from '../../interfaces/store/strategyMap';
import createReducer from '../../util/reducerFactory';

const initialState: ProfileState = {
  id: 0,
  user: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
  },
  loading: false,
  error: null,
};

const strategyMap: StrategyMap<ProfileState, typeof PROFILE> = {
  [PROFILE.GET_USER_INFO]: getUserInfoTransformer,
  [PROFILE.GET_USER_INFO_SUCCESS]: getUserInfoSuccessTransformer,
  [PROFILE.ERROR]: setProfileErrorTransformer,
};

const profileReducer = createReducer<ProfileState, typeof PROFILE>(
  strategyMap,
  initialState,
);

function getUserInfoTransformer(
  state: ProfileState,
  _: ReturnType<GetUserInfoAction>,
): ProfileState {
  return { ...state, loading: true };
}

function getUserInfoSuccessTransformer(
  state: ProfileState,
  { payload }: ReturnType<GetUserInfoSuccessAction>,
): ProfileState {
  return { ...state, ...payload, error: null, loading: false };
}

function setProfileErrorTransformer(
  state: ProfileState,
  { payload }: ReturnType<SetProfileErrorAction>,
): ProfileState {
  return { ...state, error: payload, loading: false };
}

export default profileReducer;
