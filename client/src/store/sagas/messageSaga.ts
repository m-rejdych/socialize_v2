import { call, put, takeEvery } from 'redux-saga/effects';

import { setChatError } from '../actions/chatActions';
import {
  createMessage,
  addMessageReaction,
} from '../../services/messageService';
import {
  CreateMessageAction,
  AddMessageReactionAction,
} from '../../interfaces/message/messageActions';
import { CreateMessageRes } from '../../interfaces/message/messageRes';
import { MESSAGE } from '../../shared/constants/actionTypes';

function* handleCreateMessage({ payload }: ReturnType<CreateMessageAction>) {
  try {
    const { socket, ...rest } = payload;
    const response: CreateMessageRes = yield call(createMessage, rest);

    if (response.data && socket) {
      socket.emit('message', response.data);
    }
  } catch (error) {
    yield put(setChatError(error.response.data.message));
  }
}

function* handleAddMessageReaction({
  payload,
}: ReturnType<AddMessageReactionAction>) {
  try {
    const { socket, ...rest } = payload;
    const response: CreateMessageRes = yield call(addMessageReaction, rest);

    if (response.data && socket) {
      socket.emit('reaction', response.data);
    }
  } catch (error) {
    yield put(setChatError(error.response.data.message));
  }
}

export function* createMessageSaga() {
  yield takeEvery(MESSAGE.CREATE_MESSAGE, handleCreateMessage);
}

export function* addMessageReactionSaga() {
  yield takeEvery(MESSAGE.ADD_MESSAGE_REACTION, handleAddMessageReaction);
}
