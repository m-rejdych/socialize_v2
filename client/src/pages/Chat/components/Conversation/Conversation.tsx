import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import { getChat } from '../../../../store/actions/chatActions';
import RootState from '../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  left: number;
}

const Conversation: React.FC<Props> = ({ left }) => {
  const { id } = useParams<{ id: string }>();
  const chat = useSelector((state: RootState) => state.chat.selectedChat);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (id) dispatch(getChat(Number(id)));
  }, [id]);

  return (
    <Box
      width={`calc(100% - ${left}px)`}
      minHeight="100vh"
      className={classes.container}
      style={{ left }}
    >
      {chat && !loading ? (
        <div>{chat.id}</div>
      ) : (
        <Box
          height="100vh"
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
