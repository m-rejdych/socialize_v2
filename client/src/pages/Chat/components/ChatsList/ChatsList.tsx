import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import FriendsChatsList from './FriendsChatsList';
import RootState from '../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'inline-block',
    paddingRight: theme.spacing(3),
    position: 'fixed',
  },
}));

const ChatsList = React.forwardRef<HTMLDivElement>((_, ref: any) => {
  const chats = useSelector((state: RootState) => state.chat.chats);
  const classes = useStyles();

  const friendsChats = chats.filter(({ type }) =>
    type ? type.name === 'friend' : true,
  );

  return (
    <div ref={ref} className={classes.container}>
      <FriendsChatsList chats={friendsChats} />
    </div>
  );
});

export default ChatsList;
