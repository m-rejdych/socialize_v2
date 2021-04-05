import { put, call, takeEvery } from 'redux-saga/effects';

import { GetSelectedChatAciton } from '../../interfaces/chat/chatActions';
import { GetChatsRes, GetChatRes } from '../../interfaces/chat/chatRes';
import {
  GetMessagesByChatIdRes,
  GetMessagesCountByChatIdRes,
} from '../../interfaces/message/messageRes';
import {
  getChatsSuccess,
  getSelectedChatSuccess,
  setChatError,
} from '../actions/chatActions';
import { getChats, getChat } from '../../services/chatService';
import {
  getMessagesByChatId,
  getMessagesCountByChatId,
} from '../../services/messageService';
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

function* handleGetSelectedChat({
  payload,
}: ReturnType<GetSelectedChatAciton>) {
  try {
    const chatResponse: GetChatRes = yield call(getChat, payload.chatId);

    if (chatResponse.data) {
      const messagesResponse: GetMessagesByChatIdRes = yield call(
        getMessagesByChatId,
        payload,
      );

      const messagesCountResponse: GetMessagesCountByChatIdRes = yield call(
        getMessagesCountByChatId,
        payload.chatId,
      );

      if (messagesResponse.data && messagesCountResponse.data !== undefined) {
        yield put(
          getSelectedChatSuccess({
            chat: chatResponse.data,
            messages: messagesResponse.data,
            messagesCount: messagesCountResponse.data,
          }),
        );
      }
    }
  } catch (error) {
    yield put(setChatError(error.response.data.message));
  }
}

export function* getChatsSaga() {
  yield takeEvery(CHAT.GET_CHATS, handleGetChats);
}

export function* getSelectedChatSaga() {
  yield takeEvery(CHAT.GET_SELECTED_CHAT, handleGetSelectedChat);
}
