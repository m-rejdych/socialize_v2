import Action from '../store/action';
import Chat from './chat';
import { CHAT } from '../../shared/constants/actionTypes';
import {
  GetSelectedChatPayload,
  GetSelectedChatSuccessPayload,
} from './chatPayloads';

export type GetChatsAction = Action<typeof CHAT.GET_CHATS, null>;

export type GetChatsSuccessAction = Action<
  typeof CHAT.GET_CHATS_SUCCESS,
  Chat[]
>;

export type GetSelectedChatAciton = Action<
  typeof CHAT.GET_SELECTED_CHAT,
  GetSelectedChatPayload
>;

export type GetSelectedChatSuccessAction = Action<
  typeof CHAT.GET_SELECTED_CHAT_SUCCESS,
  GetSelectedChatSuccessPayload | null
>;

export type SetChatError = Action<typeof CHAT.ERROR, string | null>;
