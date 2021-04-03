import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Box, makeStyles, Typography } from '@material-ui/core';

import MessageType from '../../../../../interfaces/message';
import RootState from '../../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  myMessageBg: {
    backgroundColor: theme.palette.secondary.main,
  },
  otherMessageBg: {
    backgroundColor: theme.palette.grey[600],
  },
  author: {
    position: 'absolute',
    bottom: `calc(100% + ${theme.spacing(0.5)}px)`,
    whiteSpace: 'nowrap',
  },
  rightPosition: {
    right: theme.spacing(2),
  },
  leftPosition: {
    left: theme.spacing(2),
  },
}));

interface Props extends MessageType {}

const Message: React.FC<Props> = ({ content, author }) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const classes = useStyles();

  const isMe = userId === author?.id;

  return (
    <Box
      position="relative"
      p={2}
      m={2}
      maxWidth="90%"
      borderRadius={30}
      alignSelf={isMe ? 'flex-end' : 'flex-start'}
      className={isMe ? classes.myMessageBg : classes.otherMessageBg}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        className={classNames(
          classes.author,
          isMe ? classes.rightPosition : classes.leftPosition,
        )}
      >
        {author ? `${author.firstName} ${author.lastName}` : ''}
      </Typography>
      {content}
    </Box>
  );
};

export default Message;
