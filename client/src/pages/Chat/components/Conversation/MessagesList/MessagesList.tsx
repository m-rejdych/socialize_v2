import { useEffect, useRef, LegacyRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import io from 'socket.io-client';
import classNames from 'classnames';

import Message from './Message';
import MessageType from '../../../../../interfaces/message';
import RootState from '../../../../../interfaces/store';
import {
  addMessage,
  updateMessage,
  deleteMessageReactionSuccess,
} from '../../../../../store/actions/messageActions';
import { DeleteMessageReactionSuccessPayload } from '../../../../../interfaces/message/messagePayloads';
import { API_URI } from '../../../../../config';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'auto',
  },
  noMessagesContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface Props {
  setSocket: (socket: SocketIOClient.Socket | null) => void;
  socket: SocketIOClient.Socket | null;
  lastMessageRef: LegacyRef<HTMLDivElement> | null;
}

const MessagesList: React.FC<Props> = ({
  setSocket,
  socket,
  lastMessageRef,
}) => {
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
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });

    socket.on('reaction', (message: MessageType): void => {
      dispatch(updateMessage(message));
    });

    socket.on(
      'reaction-delete',
      (messageData: DeleteMessageReactionSuccessPayload): void => {
        dispatch(deleteMessageReactionSuccess(messageData));
      },
    );

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
  }, []);

  return (
    <div
      ref={listRef}
      className={classNames(
        classes.listContainer,
        messages?.length || classes.noMessagesContainer,
      )}
    >
      {messages?.length ? (
        messages.map((message, index) => (
          <Message
            key={message.id}
            socket={socket}
            messageRef={index === messages.length - 1 ? lastMessageRef : null}
            {...message}
          />
        ))
      ) : (
        <Typography color="textSecondary" variant="h4">
          No messages
        </Typography>
      )}
    </div>
  );
};

export default MessagesList;
