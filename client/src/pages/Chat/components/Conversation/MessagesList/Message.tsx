import { LegacyRef } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';

import MessageType from '../../../../../interfaces/message';
import RootState from '../../../../../interfaces/store';
import ReactionPopper from '../../../../../shared/components/ReactionPopper';
import ReactionsCounter from '../../../../../shared/components/ReactionsCounter';

const useStyles = makeStyles((theme) => ({
  message: {
    position: 'relative',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    maxWidth: '90%',
    borderRadius: 30,
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
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
  reactionIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  myMessageReactionIcon: {
    right: `calc(100% + ${theme.spacing(0.5)}px)`,
  },
  otherMessageReactionIcon: {
    left: `calc(100% + ${theme.spacing(0.5)}px)`,
  },
  reactionsCounter: {
    position: 'absolute',
    bottom: '-11px',
  },
}));

interface Props extends MessageType {
  socket: SocketIOClient.Socket | null;
  messageRef: LegacyRef<HTMLDivElement> | null;
}

const Message: React.FC<Props> = ({
  id,
  content,
  author,
  socket,
  reactions,
  messageRef,
}) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const classes = useStyles();

  const isMe = userId === author?.id;

  return (
    <div
      className={classNames(
        classes.message,
        isMe ? classes.alignSelfEnd : classes.alignSelfStart,
        isMe ? classes.myMessageBg : classes.otherMessageBg,
      )}
      ref={messageRef}
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
      <ReactionPopper
        variant="icon"
        messageId={id}
        socket={socket}
        reactions={reactions}
        className={classNames(
          classes.reactionIcon,
          isMe
            ? classes.myMessageReactionIcon
            : classes.otherMessageReactionIcon,
        )}
      />
      <ReactionsCounter
        id={id}
        reactions={reactions}
        className={classNames(
          classes.reactionsCounter,
          isMe ? classes.rightPosition : classes.leftPosition,
        )}
      />
      {content}
    </div>
  );
};

export default Message;
