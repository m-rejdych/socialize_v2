import Chat from './chat';

export default interface ChatState {
  chats: Chat[];
  selectedChat: Chat | null;
  loading: boolean;
  error: null | string;
}
