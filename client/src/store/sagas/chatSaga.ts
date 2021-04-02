import { put, call, takeEvery } from 'redux-saga/effects';

import { GetChatAction } from '../../interfaces/chat/chatActions';
import { GetChatsRes, GetChatRes } from '../../interfaces/chat/chatRes';
import {
  getChatsSuccess,
  getChatSuccess,
  setChatError,
} from '../actions/chatActions';
import { getChats, getChat } from '../../services/chatService';
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

function* handleGetChat({ payload }: ReturnType<GetChatAction>) {
  try {
    const response: GetChatRes = yield call(getChat, payload);

    if (response.data) {
      yield put(getChatSuccess(response.data));
    }
  } catch (error) {
    yield put(setChatError(error.response.data.message));
  }
}

export function* getChatsSaga() {
  yield takeEvery(CHAT.GET_CHATS, handleGetChats);
}

export function* getChatSaga() {
  yield takeEvery(CHAT.GET_CHAT, handleGetChat);
}
