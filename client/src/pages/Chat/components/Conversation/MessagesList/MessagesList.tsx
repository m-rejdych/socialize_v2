import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import io from 'socket.io-client';

import Message from './Message';
import MessageType from '../../../../../interfaces/message';
import RootState from '../../../../../interfaces/store';
import {
  addMessage,
  updateMessage,
} from '../../../../../store/actions/messageActions';
import { API_URI } from '../../../../../config';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}));

interface Props {
  setSocket: (socket: SocketIOClient.Socket | null) => void;
  socket: SocketIOClient.Socket | null;
}

const MessagesList: React.FC<Props> = ({ setSocket, socket }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const messages = useSelector(
    (state: RootState) => state.chat.selectedChat?.messages,
  );
  const chatId = useSelector(
    (state: RootState) => state.chat.selectedChat?.chat.id,
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const socket = io(`${API_URI}/chats`);

    socket.on('connect', (): void => {
      setSocket(socket);
    });

    socket.on('disconnect', (): void => {
      socket.emit('leave-chat', chatId);
      setSocket(null);
    });

    if (chatId) {
      socket.emit('join-chat', chatId);
    }

    socket.on('message', (message: MessageType): void => {
      dispatch(addMessage(message));
    });

    socket.on('reaction', (message: MessageType): void => {
      console.log('reaction');
      dispatch(updateMessage(message));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
        ? messages.map((message) => (
            <Message key={message.id} socket={socket} {...message} />
          ))
        : null}
    </div>
  );
};

export default MessagesList;
