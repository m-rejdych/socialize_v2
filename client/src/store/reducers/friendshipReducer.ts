import createReducer from '../../util/reducerFactory';
import {
  GetAllFriendshipsAction,
  GetAllFriendshipsSuccessAction,
  GetFriendshipAction,
  getFriendshipSuccessAction,
  SetFriendshipError,
} from '../../interfaces/friendship/friendshipActions';
import { FRIENDSHIP } from '../../shared/constants/actionTypes';
import StrategyMap from '../../interfaces/store/strategyMap';
import FriendshipState from '../../interfaces/friendship/friendshipState';

const initialState: FriendshipState = {
  allFriendships: [],
  selectedFriendship: null,
  loading: false,
  initialLoad: false,
  error: null,
};

const strategyMap: StrategyMap<FriendshipState, typeof FRIENDSHIP> = {
  [FRIENDSHIP.GET_ALL_FRIENDSHIPS]: getAllFriendshipsTransformer,
  [FRIENDSHIP.GET_ALL_FRIENDSHIPS_SUCCESS]: getAllFriendshipsSuccessTransformer,
  [FRIENDSHIP.GET_FRIENDSHIP]: getFriendshipTransformer,
  [FRIENDSHIP.GET_FRIENDSHIP_SUCCESS]: getFriendshipSuccessTransformer,
  [FRIENDSHIP.ERROR]: setFriendshipErrorTransformer,
};

const friendshipReducer = createReducer<FriendshipState, typeof FRIENDSHIP>(
  strategyMap,
  initialState,
);

function getAllFriendshipsTransformer(
  state: FriendshipState,
  _: ReturnType<GetAllFriendshipsAction>,
): FriendshipState {
  return { ...state, loading: true };
}

function getAllFriendshipsSuccessTransformer(
  state: FriendshipState,
  { payload }: ReturnType<GetAllFriendshipsSuccessAction>,
): FriendshipState {
  return {
    ...state,
    loading: false,
    initialLoad: true,
    error: null,
    allFriendships: payload,
  };
}

function getFriendshipTransformer(
  state: FriendshipState,
  _: ReturnType<GetFriendshipAction>,
): FriendshipState {
  return { ...state, loading: true };
}

function getFriendshipSuccessTransformer(
  state: FriendshipState,
  { payload }: ReturnType<getFriendshipSuccessAction>,
): FriendshipState {
  return {
    ...state,
    loading: false,
    initialLoad: true,
    error: null,
    selectedFriendship: payload,
  };
}

function setFriendshipErrorTransformer(
  state: FriendshipState,
  { payload }: ReturnType<SetFriendshipError>,
): FriendshipState {
  return { ...state, loading: false, error: payload };
}

export default friendshipReducer;
