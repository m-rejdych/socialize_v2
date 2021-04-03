import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import { getSelectedChat } from '../../../../store/actions/chatActions';
import RootState from '../../../../interfaces/store';
import MessagesList from './MessagesList';
import CreateMessageInput from './CreateMessageInput';

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
  const { id } = useParams<{ id?: string }>();
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat,
  );
  const loading = useSelector((state: RootState) => state.chat.loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (id) dispatch(getSelectedChat(Number(id)));
  }, [id]);

  return (
    <Box
      width={`calc(100% - ${left}px)`}
      height="calc(100vh - 24px)"
      className={classes.container}
      style={{ left }}
    >
      {selectedChat && id && !loading ? (
        <Box height="100%" display="flex" flexDirection="column">
          {selectedChat.messages?.length ? (
            <>
              <MessagesList setSocket={setSocket} />
              <CreateMessageInput socket={socket} />
            </>
          ) : (
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography color="textSecondary" variant="h4">
                No messages
              </Typography>
            </Box>
          )}
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
