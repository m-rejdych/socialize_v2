import createReducer from '../../util/reducerFactory';
import {
  GetAllFriendshipsAction,
  GetAllFriendshipsSuccessAction,
  GetFriendshipAction,
  GetFriendshipSuccessAction,
  CreateFriendshipAction,
  CreateFriendshipSuccessAction,
  AcceptFriendshipAction,
  AcceptFriendshipSuccessAction,
  DeleteFriendshipAction,
  DeleteFriendshipSuccessAction,
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
  [FRIENDSHIP.ACCEPT_FRIENDSHIP]: acceptFriendshipTransformer,
  [FRIENDSHIP.ACCEPT_FRIENDSHIP_SUCCESS]: accpetFriendshipSuccessTransformer,
  [FRIENDSHIP.DELETE_FRIENDSHIP]: deleteFriendshipTransformer,
  [FRIENDSHIP.DELETE_FRIENDSHIP_SUCCESS]: deleteFriendshipSuccessTransformer,
  [FRIENDSHIP.ERROR]: setFriendshipErrorTransformer,
};

const friendshipReducer = createReducer(strategyMap, initialState);

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

function acceptFriendshipTransformer(
  state: FriendshipState,
  _: ReturnType<AcceptFriendshipAction>,
): FriendshipState {
  return { ...state, loading: true };
}

function accpetFriendshipSuccessTransformer(
  state: FriendshipState,
  { payload }: ReturnType<AcceptFriendshipSuccessAction>,
): FriendshipState {
  return {
    ...state,
    loading: false,
    error: null,
    selectedFriendship: payload,
    allFriendships: state.allFriendships.map((friendship) =>
      friendship.id === payload.id ? payload : friendship,
    ),
  };
}

function deleteFriendshipTransformer(
  state: FriendshipState,
  _: ReturnType<DeleteFriendshipAction>,
): FriendshipState {
  return { ...state, loading: true };
}

function deleteFriendshipSuccessTransformer(
  state: FriendshipState,
  { payload }: ReturnType<DeleteFriendshipSuccessAction>,
): FriendshipState {
  return {
    ...state,
    loading: false,
    error: null,
    allFriendships: state.allFriendships.filter(({ id }) => id !== payload),
    selectedFriendship: null,
  };
}

function setFriendshipErrorTransformer(
  state: FriendshipState,
  { payload }: ReturnType<SetFriendshipError>,
): FriendshipState {
  return { ...state, loading: false, error: payload, initialLoad: true };
}

export default friendshipReducer;
