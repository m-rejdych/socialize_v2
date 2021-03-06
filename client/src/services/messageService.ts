import createJwtRequest from '../util/jwtRequestFactory';
import {
  GetMessagesByChatIdRes,
  GetMessagesCountByChatIdRes,
  CreateMessageRes,
  DeleteMessageReactionRes,
} from '../interfaces/message/messageRes';
import {
  CreateMessageReq,
  AddMessageReactionReq,
  GetMessagesByChatIdReq,
} from '../interfaces/message/messageReq';
import { API_URI } from '../config';

export const getMessagesByChatId = (
  data: GetMessagesByChatIdReq,
): Promise<GetMessagesByChatIdRes> =>
  createJwtRequest<GetMessagesByChatIdRes>({
    method: 'GET',
    url: `${API_URI}/message/get-by-chat-id?chatId=${data.chatId}${
      data.take ? `&take=${data.take}` : ''
    }${data.skip ? `&skip=${data.skip}` : ''}`,
  });

export const getMessagesCountByChatId = (
  chatId: number,
): Promise<GetMessagesCountByChatIdRes> =>
  createJwtRequest<GetMessagesCountByChatIdRes>({
    method: 'GET',
    url: `${API_URI}/message/get-count-by-chat-id?chatId=${chatId}`,
  });

export const createMessage = (
  data: CreateMessageReq,
): Promise<CreateMessageRes> =>
  createJwtRequest<CreateMessageRes>({
    method: 'POST',
    url: `${API_URI}/message/create-message`,
    body: data,
  });

export const addMessageReaction = (
  data: AddMessageReactionReq,
): Promise<CreateMessageRes> =>
  createJwtRequest<CreateMessageRes>({
    method: 'PUT',
    url: `${API_URI}/message/add-reaction`,
    body: data,
  });

export const deleteMessageReaction = (
  messageId: number,
): Promise<DeleteMessageReactionRes> =>
  createJwtRequest<DeleteMessageReactionRes>({
    method: 'DELETE',
    url: `${API_URI}/message/delete-reaction?messageId=${messageId}`,
  });

export const markAsSeen = (messageId: number): Promise<CreateMessageRes> =>
  createJwtRequest({
    method: 'PUT',
    url: `${API_URI}/message/mark-as-seen`,
    body: { messageId },
  });
