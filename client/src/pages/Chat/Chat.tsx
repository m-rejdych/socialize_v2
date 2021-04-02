import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';

import { getChats } from '../../store/actions/chatActions';
import ChatsList from './components/ChatsList';
import Conversation from './components/Conversation';

const Chat: React.FC = () => {
  const [listWidth, setListWidth] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats(null));
  }, []);

  const chatsListRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setListWidth(node.offsetWidth);
    }
  }, []);

  return (
    <Box display="flex" justifyContent="space-between">
      <ChatsList ref={chatsListRef} />
      <Conversation left={listWidth} />
    </Box>
  );
};

export default Chat;
