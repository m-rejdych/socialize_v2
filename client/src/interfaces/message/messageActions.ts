import Action from '../store/action';
import Message from './message';
import { CreateMessageReq } from './messageReq';
import { MESSAGE } from '../../shared/constants/actionTypes';

export type CreateMessageAction = Action<
  typeof MESSAGE.CREATE_MESSAGE,
  CreateMessageReq
>;

export type CreateMessageSuccessAction = Action<
  typeof MESSAGE.CREATE_MESSAGE_SUCCESS,
  Message
>;
