import Chat from './chat';
import Message from '../message';

interface SelectedChat {
  chat: Chat;
  messages: Message[];
}

export default interface ChatState {
  chats: Chat[];
  selectedChat: SelectedChat | null;
  loading: boolean;
  error: null | string;
}
