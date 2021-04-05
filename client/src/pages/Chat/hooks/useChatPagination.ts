import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSelectedChat,
  getSelectedChatSuccess,
} from '../../../store/actions/chatActions';
import RootState from '../../../interfaces/store';

const TAKE = 15;

interface ReturnValue {
  setSkip: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
}

const useChatPagination = (chatId?: number): ReturnValue => {
  const [skip, setSkip] = useState(0);
  const messagesCount = useSelector(
    (state: RootState) => state.chat.selectedChat?.messagesCount,
  );
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(getSelectedChatSuccess(null));
    },
    [],
  );

  useEffect(() => {
    setSkip(0);
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      dispatch(getSelectedChat({ chatId, skip, take: TAKE }));
    }
  }, [skip, chatId]);

  return {
    setSkip,
    hasMore: messagesCount === undefined || skip < messagesCount - TAKE,
  };
};

export default useChatPagination;
