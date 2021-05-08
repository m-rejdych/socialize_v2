import { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import RootState from '../../../../interfaces/store';
import MessagesList from './MessagesList';
import CreateMessageInput from './CreateMessageInput';
import useChatPagination from '../../hooks/useChatPagination';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  left: number;
}

const Conversation: React.FC<Props> = ({ left }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const chatId = useSelector(
    (state: RootState) => state.chat.selectedChat?.chat.id,
  );
  const loading = useSelector((state: RootState) => state.chat.loading);
  const messagesLoading = useSelector(
    (state: RootState) => state.chat.messagesLoading,
  );
  const messages = useSelector(
    (state: RootState) => state.chat.selectedChat?.messages,
  );
  const { id } = useParams<{ id?: string }>();
  const { hasMore, setSkip } = useChatPagination(Number(id));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const classes = useStyles();

  const lastMessageRef = useCallback(
    (node: HTMLDivElement): void => {
      if (messagesLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prev) => (messages ? messages.length : prev + 15));
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [messagesLoading, hasMore, messages],
  );

  return (
    <Box
      width={`calc(100% - ${left}px)`}
      height="calc(100vh - 24px)"
      className={classes.container}
      style={{ left }}
    >
      {id && chatId && !loading ? (
        <Box height="100%" display="flex" flexDirection="column">
          <MessagesList
            setSocket={setSocket}
            socket={socket}
            lastMessageRef={lastMessageRef}
          />
          <CreateMessageInput socket={socket} />
        </Box>
      ) : (
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <CircularProgress size={200} color="primary" />
          ) : (
            <Typography color="textSecondary" variant="h4">
              Select chat
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Conversation;
