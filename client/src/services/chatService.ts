import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import { GetChatsRes } from '../interfaces/chat/chatRes';

export const getChats = (): Promise<GetChatsRes> => createJwtRequest<GetChatsRes>({
  method: 'GET',
  url: `${API_URI}/chat/get-chats`,
});
