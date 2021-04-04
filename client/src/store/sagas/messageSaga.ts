import { call, put, takeEvery } from 'redux-saga/effects';

import { setChatError } from '../actions/chatActions';
import {
  createMessage,
  addMessageReaction,
  deleteMessageReaction,
} from '../../services/messageService';
import {
  CreateMessageAction,
  AddMessageReactionAction,
  DeleteMessageReactionAction,
} from '../../interfaces/message/messageActions';
import {
  CreateMessageRes,
  DeleteMessageReactionRes,
} from '../../interfaces/message/messageRes';
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

function* handleDeleteMessageReaction({
  payload,
}: ReturnType<DeleteMessageReactionAction>) {
  try {
    const { socket, messageId } = payload;
    const response: DeleteMessageReactionRes = yield call(
      deleteMessageReaction,
      messageId,
    );

    if (response.data && socket) {
      const { deleted, messageId, reactionId, chatId } = response.data;
      if (deleted) {
        socket.emit('reaction-delete', { messageId, reactionId, chatId });
      } else {
        yield put(setChatError('Message reaction could not be deleted!'));
      }
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

export function* deleteMessageReactionSaga() {
  yield takeEvery(MESSAGE.DELETE_MESSAGE_REACTION, handleDeleteMessageReaction);
}
