import ProfileState from '../../interfaces/profile/profileState';
import { PROFILE } from '../../shared/constants/actionTypes';
import {
  GetUserInfoAction,
  GetUserInfoSuccessAction,
  UpdateUserInfoAction,
  UpdateUserInfoSuccessAction,
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
  initialLoad: false,
  error: null,
};

const strategyMap: StrategyMap<ProfileState, typeof PROFILE> = {
  [PROFILE.GET_USER_INFO]: getUserInfoTransformer,
  [PROFILE.GET_USER_INFO_SUCCESS]: getUserInfoSuccessTransformer,
  [PROFILE.UPDATE_USER_INFO]: updateUserInfoTransformer,
  [PROFILE.UPDATE_USER_INFO_SUCCESS]: updateUserInfoSuccessTransformer,
  [PROFILE.ERROR]: setProfileErrorTransformer,
};

const profileReducer = createReducer(strategyMap, initialState);

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
  return {
    ...state,
    ...payload,
    error: null,
    loading: false,
    initialLoad: true,
  };
}

function updateUserInfoTransformer(
  state: ProfileState,
  _: ReturnType<UpdateUserInfoAction>,
): ProfileState {
  return { ...state, loading: true };
}

function updateUserInfoSuccessTransformer(
  state: ProfileState,
  { payload }: ReturnType<UpdateUserInfoSuccessAction>,
): ProfileState {
  return { ...state, ...payload, loading: false, error: null };
}

function setProfileErrorTransformer(
  state: ProfileState,
  { payload }: ReturnType<SetProfileErrorAction>,
): ProfileState {
  return { ...state, error: payload, loading: false, initialLoad: true };
}

export default profileReducer;
