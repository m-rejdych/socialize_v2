import createAction from '../../util/actionFactory';
import {
  CreateMessageAction,
  CreateMessageSuccessAction,
} from '../../interfaces/message/messageActions';
import { MESSAGE } from '../../shared/constants/actionTypes';

export const createMessage: CreateMessageAction = createAction(
  MESSAGE.CREATE_MESSAGE,
);

export const createMessageSuccess: CreateMessageSuccessAction = createAction(
  MESSAGE.CREATE_MESSAGE_SUCCESS,
);
