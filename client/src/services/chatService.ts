import createJwtRequest from '../util/jwtRequestFactory';
import { API_URI } from '../config';
import { GetChatsRes, GetChatRes } from '../interfaces/chat/chatRes';

export const getChats = (): Promise<GetChatsRes> =>
  createJwtRequest<GetChatsRes>({
    method: 'GET',
    url: `${API_URI}/chat/get-chats`,
  });

export const getChat = (id: number): Promise<GetChatRes> =>
  createJwtRequest<GetChatRes>({
    method: 'GET',
    url: `${API_URI}/chat/get-chat/${id}`,
  });
