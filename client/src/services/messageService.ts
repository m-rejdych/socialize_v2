import createJwtRequest from '../util/jwtRequestFactory';
import {
  GetMessagesByChatIdRes,
  CreateMessageRes,
} from '../interfaces/message/messageRes';
import { CreateMessageReq } from '../interfaces/message/messageReq';
import { API_URI } from '../config';

export const getMessagesByChatId = (
  chatId: number,
): Promise<GetMessagesByChatIdRes> =>
  createJwtRequest<GetMessagesByChatIdRes>({
    method: 'GET',
    url: `${API_URI}/message/get-by-chat-id?chatId=${chatId}`,
  });

export const createMessage = (
  data: CreateMessageReq,
): Promise<CreateMessageRes> =>
  createJwtRequest<CreateMessageRes>({
    method: 'POST',
    url: `${API_URI}/message/create-message`,
    body: data,
  });
