import createAction from '../../util/actionFactory';
import {
  GetChatsAction,
  GetChatsSuccessAction,
  GetChatAction,
  GetChatSuccessAction,
  SetChatError,
} from '../../interfaces/chat/chatActions';
import { CHAT } from '../../shared/constants/actionTypes';

export const getChats: GetChatsAction = createAction(CHAT.GET_CHATS);

export const getChatsSuccess: GetChatsSuccessAction = createAction(
  CHAT.GET_CHATS_SUCCESS,
);

export const getChat: GetChatAction = createAction(CHAT.GET_CHAT);

export const getChatSuccess: GetChatSuccessAction = createAction(
  CHAT.GET_CHAT_SUCCESS,
);

export const setChatError: SetChatError = createAction(CHAT.ERROR);
