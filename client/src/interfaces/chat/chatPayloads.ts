import Chat from './chat';
import Message from '../message';

export interface GetSelectedChatSuccessPayload {
  chat: Chat;
  messages: Message[];
}
