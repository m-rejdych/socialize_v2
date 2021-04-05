import createReducer from '../../util/reducerFactory';
import ChatState from '../../interfaces/chat/chatState';
import StrategyMap from '../../interfaces/store/strategyMap';
import { CHAT, MESSAGE } from '../../shared/constants/actionTypes';
import {
  GetChatsAction,
  GetChatsSuccessAction,
  GetSelectedChatAciton,
  GetSelectedChatSuccessAction,
  SetChatError,
} from '../../interfaces/chat/chatActions';
import {
  CreateMessageAction,
  AddMessageAction,
  AddMessageSuccessAction,
  AddMessageReactionAction,
  UpdateMessageAction,
  DeleteMessageReactionAction,
  DeleteMessageReactionSuccessAction,
} from '../../interfaces/message/messageActions';

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  loading: false,
  messagesLoading: false,
  error: null,
};

const strategyMap: StrategyMap<ChatState, typeof CHAT & typeof MESSAGE> = {
  [CHAT.GET_CHATS]: getChatsTransformer,
  [CHAT.GET_CHATS_SUCCESS]: getChatsSuccessTransfomer,
  [CHAT.GET_SELECTED_CHAT]: getSelectedChatTransformer,
  [CHAT.GET_SELECTED_CHAT_SUCCESS]: getSelectedChatSuccessTransformer,
  [MESSAGE.CREATE_MESSAGE]: createMessageTransformer,
  [MESSAGE.ADD_MESSAGE]: addMessageTransformer,
  [MESSAGE.ADD_MESSAGE_SUCCESS]: addMessageSuccessTransformer,
  [MESSAGE.ADD_MESSAGE_REACTION]: addMessageReactionTransformer,
  [MESSAGE.UPDATE_MESSAGE]: updateMessageTransformer,
  [MESSAGE.DELETE_MESSAGE_REACTION]: deleteMessageReactionTransformer,
  [MESSAGE.DELETE_MESSAGE_REACTION_SUCCESS]: deleteMessageReactionSuccessTransformer,
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
  return {
    ...state,
    loading: state.selectedChat ? state.loading : true,
    messagesLoading: state.selectedChat ? true : state.messagesLoading,
  };
}

function getSelectedChatSuccessTransformer(
  state: ChatState,
  { payload }: ReturnType<GetSelectedChatSuccessAction>,
): ChatState {
  return {
    ...state,
    loading: false,
    messagesLoading: false,
    error: null,
    selectedChat: payload && {
      ...payload,
      messages:
        payload.chat.id === state.selectedChat?.chat.id
          ? [...state.selectedChat.messages, ...payload.messages]
          : payload.messages,
    },
  };
}

function createMessageTransformer(
  state: ChatState,
  _: ReturnType<CreateMessageAction>,
): ChatState {
  return state;
}

function addMessageTransformer(
  state: ChatState,
  _: ReturnType<AddMessageAction>,
): ChatState {
  return state;
}

function addMessageSuccessTransformer(
  state: ChatState,
  { payload }: ReturnType<AddMessageSuccessAction>,
): ChatState {
  return {
    ...state,
    error: null,
    selectedChat: state.selectedChat
      ? {
          ...state.selectedChat,
          messages: [payload, ...state.selectedChat?.messages],
          messagesCount: state.selectedChat.messagesCount + 1,
        }
      : null,
  };
}

function addMessageReactionTransformer(
  state: ChatState,
  _: ReturnType<AddMessageReactionAction>,
): ChatState {
  return state;
}

function updateMessageTransformer(
  state: ChatState,
  { payload }: ReturnType<UpdateMessageAction>,
): ChatState {
  return {
    ...state,
    selectedChat: state.selectedChat
      ? {
          ...state.selectedChat,
          messages: state.selectedChat.messages.map((message) =>
            message.id === payload.id ? payload : message,
          ),
        }
      : null,
  };
}

function deleteMessageReactionTransformer(
  state: ChatState,
  _: ReturnType<DeleteMessageReactionAction>,
): ChatState {
  return state;
}

function deleteMessageReactionSuccessTransformer(
  state: ChatState,
  { payload }: ReturnType<DeleteMessageReactionSuccessAction>,
): ChatState {
  return {
    ...state,
    selectedChat: state.selectedChat
      ? {
          ...state.selectedChat,
          messages: state.selectedChat.messages.map((message) =>
            message.id === payload.messageId
              ? {
                  ...message,
                  reactions: message.reactions
                    ? message.reactions.filter(
                        ({ id }) => id !== payload.reactionId,
                      )
                    : [],
                }
              : message,
          ),
        }
      : null,
  };
}

function setChatErrorTransformer(
  state: ChatState,
  { payload }: ReturnType<SetChatError>,
): ChatState {
  return { ...state, loading: false, error: payload };
}

export default chatReducer;
