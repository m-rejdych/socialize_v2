import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import Message from './Message';
import RootState from '../../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}));

const MessagesList: React.FC = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const messages = useSelector(
    (state: RootState) => state.chat.selectedChat?.messages,
  );
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, 0);
  }, [messages]);

  return (
    <div ref={listRef} className={classes.listContainer}>
      {messages
        ? messages.map((message) => <Message key={message.id} {...message} />)
        : null}
    </div>
  );
};

export default MessagesList;
