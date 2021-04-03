import createJwtRequest from '../util/jwtRequestFactory';
import { GetMessagesByChatIdRes } from '../interfaces/message/messageRes';
import { API_URI } from '../config';

export const getMessagesByChatId = (
  chatId: number,
): Promise<GetMessagesByChatIdRes> =>
  createJwtRequest<GetMessagesByChatIdRes>({
    method: 'GET',
    url: `${API_URI}/message/get-by-chat-id?chatId=${chatId}`,
  });
