import createAction from '../../util/actionFactory';
import {
  CreateMessageAction,
  AddMessageAction,
} from '../../interfaces/message/messageActions';
import { MESSAGE } from '../../shared/constants/actionTypes';

export const createMessage: CreateMessageAction = createAction(
  MESSAGE.CREATE_MESSAGE,
);

export const addMessage: AddMessageAction = createAction(MESSAGE.ADD_MESSAGE);
