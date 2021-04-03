import Action from '../store/action';
import Message from './message';
import { CreateMessagePayload } from './messagePayloads';
import { MESSAGE } from '../../shared/constants/actionTypes';

export type CreateMessageAction = Action<
  typeof MESSAGE.CREATE_MESSAGE,
  CreateMessagePayload
>;

export type AddMessageAction = Action<typeof MESSAGE.ADD_MESSAGE, Message>;
