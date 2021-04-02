import createReducer from '../../util/reducerFactory';
import ChatState from '../../interfaces/chat/chatState';
import StrategyMap from '../../interfaces/store/strategyMap';
import { CHAT } from '../../shared/constants/actionTypes';
import {
  GetChatsAction,
  GetChatsSuccessAction,
  GetChatAction,
  GetChatSuccessAction,
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
  [CHAT.GET_CHAT]: getChatTransformer,
  [CHAT.GET_CHAT_SUCCESS]: getChatSuccessTransformer,
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

function getChatTransformer(
  state: ChatState,
  _: ReturnType<GetChatAction>,
): ChatState {
  return { ...state, loading: true };
}

function getChatSuccessTransformer(
  state: ChatState,
  { payload }: ReturnType<GetChatSuccessAction>,
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
