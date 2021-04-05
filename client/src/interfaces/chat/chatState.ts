import Chat from './chat';
import Message from '../message';

interface SelectedChat {
  chat: Chat;
  messages: Message[];
  messagesCount: number;
}

export default interface ChatState {
  chats: Chat[];
  selectedChat: SelectedChat | null;
  loading: boolean;
  messagesLoading: boolean;
  error: null | string;
}
