import Chat from './chat';
import Message from '../message';

export interface GetSelectedChatPayload {
  chatId: number;
  take?: number;
  skip?: number;
}

export interface GetSelectedChatSuccessPayload {
  chat: Chat;
  messages: Message[];
  messagesCount: number;
}
