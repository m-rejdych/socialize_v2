import createReducer from '../../util/reducerFactory';
import ChatState from '../../interfaces/chat/chatState';
import StrategyMap from '../../interfaces/store/strategyMap';
import { CHAT } from '../../shared/constants/actionTypes';
import {
  GetChatsAction,
  GetChatsSuccessAction,
  GetSelectedChatAciton,
  GetSelectedChatSuccessAction,
  SetChatError,
} from '../../interfaces/chat/chatActions';

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  loading: false,
  error: null,
};

const strategyMap: StrategyMap<ChatState, typeof CHAT> = {
  [CHAT.GET_CHATS]: getChatsTransformer,
  [CHAT.GET_CHATS_SUCCESS]: getChatsSuccessTransfomer,
  [CHAT.GET_SELECTED_CHAT]: getSelectedChatTransformer,
  [CHAT.GET_SELECTED_CHAT_SUCCESS]: getSelectedChatSuccessTransformer,
  [CHAT.ERROR]: setChatErrorTransformer,
};

const chatReducer = createReducer(strategyMap, initialState);

function getChatsTransformer(
  state: ChatState,
  _: ReturnType<GetChatsAction>,
): ChatState {
  return { ...state, loading: true };
}

function getChatsSuccessTransfomer(
  state: ChatState,
  { payload }: ReturnType<GetChatsSuccessAction>,
): ChatState {
  return { ...state, loading: false, error: null, chats: payload };
}

function getSelectedChatTransformer(
  state: ChatState,
  _: ReturnType<GetSelectedChatAciton>,
): ChatState {
  return { ...state, loading: true };
}

function getSelectedChatSuccessTransformer(
  state: ChatState,
  { payload }: ReturnType<GetSelectedChatSuccessAction>,
): ChatState {
  return { ...state, loading: false, error: null, selectedChat: payload };
}

function setChatErrorTransformer(
  state: ChatState,
  { payload }: ReturnType<SetChatError>,
): ChatState {
  return { ...state, loading: false, error: payload };
}

export default chatReducer;
