import Chat from './chat';

export default interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: null | string;
}
