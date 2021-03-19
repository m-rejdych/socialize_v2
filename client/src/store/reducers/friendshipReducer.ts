import createReducer from '../../util/reducerFactory';
import {
  GetAllFriendshipsAction,
  GetAllFriendshipsSuccessAction,
  GetFriendshipAction,
  GetFriendshipSuccessAction,
  CreateFriendshipAction,
  CreateFriendshipSuccessAction,
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
  [FRIENDSHIP.CREATE_FRIENDSHIP]: createFriendshipTransformer,
  [FRIENDSHIP.CREATE_FRIENDSHIP_SUCCESS]: createFriendshipSuccessTransformer,
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
  { payload }: ReturnType<GetFriendshipSuccessAction>,
): FriendshipState {
  return {
    ...state,
    loading: false,
    initialLoad: true,
    error: null,
    selectedFriendship: payload,
  };
}

function createFriendshipTransformer(
  state: FriendshipState,
  _: ReturnType<CreateFriendshipAction>,
): FriendshipState {
  return { ...state, loading: true };
}

function createFriendshipSuccessTransformer(
  state: FriendshipState,
  { payload }: ReturnType<CreateFriendshipSuccessAction>,
): FriendshipState {
  return {
    ...state,
    loading: false,
    error: null,
    allFriendships: [...state.allFriendships, payload],
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
