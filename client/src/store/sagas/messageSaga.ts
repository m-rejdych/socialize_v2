import { call, put, takeEvery } from 'redux-saga/effects';

import { createMessageSuccess } from '../actions/messageActions';
import { setChatError } from '../actions/chatActions';
import { createMessage } from '../../services/messageService';
import { CreateMessageAction } from '../../interfaces/message/messageActions';
import { CreateMessageRes } from '../../interfaces/message/messageRes';
import { MESSAGE } from '../../shared/constants/actionTypes';

function* handleCreateMessage({ payload }: ReturnType<CreateMessageAction>) {
  try {
    const response: CreateMessageRes = yield call(createMessage, payload);

    if (response.data) {
      yield put(createMessageSuccess(response.data));
    }
  } catch (error) {
    yield put(setChatError(error.response.data.message));
  }
}

export function* createMessageSaga() {
  yield takeEvery(MESSAGE.CREATE_MESSAGE, handleCreateMessage);
}
