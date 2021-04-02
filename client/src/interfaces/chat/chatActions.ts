import Action from '../store/action';
import Chat from './chat';
import { CHAT } from '../../shared/constants/actionTypes';

export type GetChatsAction = Action<typeof CHAT.GET_CHATS, null>;

export type GetChatsSuccessAction = Action<
  typeof CHAT.GET_CHATS_SUCCESS,
  Chat[]
>;

export type GetChatAction = Action<typeof CHAT.GET_CHAT, number>;

export type GetChatSuccessAction = Action<typeof CHAT.GET_CHAT_SUCCESS, Chat>;

export type SetChatError = Action<typeof CHAT.ERROR, string | null>;
