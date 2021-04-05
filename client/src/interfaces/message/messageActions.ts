import Action from '../store/action';
import Message from './message';
import {
  CreateMessagePayload,
  AddMessageReactionPayload,
  DeleteMessageReactionPayload,
  DeleteMessageReactionSuccessPayload,
} from './messagePayloads';
import { MESSAGE } from '../../shared/constants/actionTypes';

export type CreateMessageAction = Action<
  typeof MESSAGE.CREATE_MESSAGE,
  CreateMessagePayload
>;

export type AddMessageAction = Action<typeof MESSAGE.ADD_MESSAGE, Message>;

export type AddMessageSuccessAction = Action<
  typeof MESSAGE.ADD_MESSAGE_SUCCESS,
  Message
>;

export type AddMessageReactionAction = Action<
  typeof MESSAGE.ADD_MESSAGE_REACTION,
  AddMessageReactionPayload
>;

export type UpdateMessageAction = Action<
  typeof MESSAGE.UPDATE_MESSAGE,
  Message
>;

export type DeleteMessageReactionAction = Action<
  typeof MESSAGE.DELETE_MESSAGE_REACTION,
  DeleteMessageReactionPayload
>;

export type DeleteMessageReactionSuccessAction = Action<
  typeof MESSAGE.DELETE_MESSAGE_REACTION_SUCCESS,
  DeleteMessageReactionSuccessPayload
>;
