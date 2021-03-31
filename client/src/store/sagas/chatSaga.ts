import { put, call, takeEvery } from 'redux-saga/effects';

import { GetChatsRes } from '../../interfaces/chat/chatRes';
import { getChatsSuccess, setChatError } from '../actions/chatActions';
import { getChats } from '../../services/chatService';
import { CHAT } from '../../shared/constants/actionTypes';

function* handleGetChats() {
  try {
    const response: GetChatsRes = yield call(getChats);

    if (response.data) {
      yield put(getChatsSuccess(response.data));
    }
  } catch (error) {
    yield put(setChatError(error.response.data.message));
  }
}

export function* getChatsSaga() {
  yield takeEvery(CHAT.GET_CHATS, handleGetChats);
}
