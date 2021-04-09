import { call, put, takeEvery, select } from 'redux-saga/effects';

import { setChatError } from '../actions/chatActions';
import {
  addMessageSuccess,
  updateMessage,
  deleteMessageReactionSuccess,
} from '../../store/actions/messageActions';
import {
  createMessage,
  addMessageReaction,
  markAsSeen,
  deleteMessageReaction,
} from '../../services/messageService';
import {
  CreateMessageAction,
  AddMessageAction,
  AddMessageReactionAction,
  DeleteMessageReactionAction,
} from '../../interfaces/message/messageActions';
import {
  CreateMessageRes,
  DeleteMessageReactionRes,
} from '../../interfaces/message/messageRes';
import { MESSAGE } from '../../shared/constants/actionTypes';
import RootState from '../../interfaces/store';
import handleError from '../../util/errorHandler';

function* handleCreateMessage({ payload }: ReturnType<CreateMessageAction>) {
  try {
    const { socket, ...rest } = payload;
    const response: CreateMessageRes = yield call(createMessage, rest);

    if (response.data && socket) {
      yield put(addMessageSuccess(response.data));
      socket.emit('message', response.data);
    }
  } catch (error) {
    yield put(handleError(setChatError, error));
  }
}

function* handleAddMessage({ payload }: ReturnType<AddMessageAction>) {
  try {
    const userId: number = yield select((state: RootState) => state.user.id);
    if (payload.author?.id === userId) yield put(addMessageSuccess(payload));
    else {
      const response: CreateMessageRes = yield call(markAsSeen, payload.id);

      if (response.data) {
        yield put(addMessageSuccess(response.data));
      }
    }
  } catch (error) {
    yield put(handleError(setChatError, error));
  }
}

function* handleAddMessageReaction({
  payload,
}: ReturnType<AddMessageReactionAction>) {
  try {
    const { socket, ...rest } = payload;
    const response: CreateMessageRes = yield call(addMessageReaction, rest);

    if (response.data && socket) {
      yield put(updateMessage(response.data));
      socket.emit('reaction', response.data);
    }
  } catch (error) {
    yield put(handleError(setChatError, error));
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
        yield put(deleteMessageReactionSuccess({ messageId, reactionId }));
        socket.emit('reaction-delete', { messageId, reactionId, chatId });
      } else {
        yield put(setChatError('Message reaction could not be deleted!'));
      }
    }
  } catch (error) {
    yield put(handleError(setChatError, error));
  }
}

export function* createMessageSaga() {
  yield takeEvery(MESSAGE.CREATE_MESSAGE, handleCreateMessage);
}

export function* addMessageSaga() {
  yield takeEvery(MESSAGE.ADD_MESSAGE, handleAddMessage);
}

export function* addMessageReactionSaga() {
  yield takeEvery(MESSAGE.ADD_MESSAGE_REACTION, handleAddMessageReaction);
}

export function* deleteMessageReactionSaga() {
  yield takeEvery(MESSAGE.DELETE_MESSAGE_REACTION, handleDeleteMessageReaction);
}
