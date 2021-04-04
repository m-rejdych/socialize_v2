import createAction from '../../util/actionFactory';
import {
  CreateMessageAction,
  AddMessageAction,
  AddMessageReactionAction,
  UpdateMessageAction,
} from '../../interfaces/message/messageActions';
import { MESSAGE } from '../../shared/constants/actionTypes';

export const createMessage: CreateMessageAction = createAction(
  MESSAGE.CREATE_MESSAGE,
);

export const addMessage: AddMessageAction = createAction(MESSAGE.ADD_MESSAGE);

export const addMessageReaction: AddMessageReactionAction = createAction(
  MESSAGE.ADD_MESSAGE_REACTION,
);

export const updateMessage: UpdateMessageAction = createAction(
  MESSAGE.UPDATE_MESSAGE,
);
