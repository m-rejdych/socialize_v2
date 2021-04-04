import createJwtRequest from '../util/jwtRequestFactory';
import {
  GetMessagesByChatIdRes,
  CreateMessageRes,
  DeleteMessageReactionRes,
} from '../interfaces/message/messageRes';
import {
  CreateMessageReq,
  AddMessageReactionReq,
} from '../interfaces/message/messageReq';
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
