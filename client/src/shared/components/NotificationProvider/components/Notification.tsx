import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import {
  hideNewNotification,
  markAsSeenById,
} from '../../../../store/actions/notificationActions';
import RootState from '../../../../interfaces/store';
import NOTIFICATION_SUFFIXES from '../constants/notificationSuffixes';
import NOTIFICATION_ROUTES from '../constants/notificationRoutes';
import NOTIFICATION_ICONS from '../constants/notificationIcons';

const useStyles = makeStyles((theme) => ({
  '@keyframes slide-in': {
    from: {
      opacity: 0,
      transform: 'translateY(100%)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes slide-out': {
    from: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    to: {
      opacity: 0,
      transform: 'translateY(100%)',
    },
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    animation: '$slide-in 0.5s ease-out',
    backgroundColor: theme.palette.grey[700],
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  slideOut: {
    animation: '$slide-out 0.5s forwards ease-in',
  },
  text: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  id: number;
  hideNotification?: boolean;
}

const Notification: React.FC<Props> = ({ id, hideNotification }) => {
  const [hide, setHide] = useState(false);
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications,
  );
  const open = useSelector((state: RootState) => state.notification.open);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (hideNotification) {
      setTimeout(() => {
        handleHide(false);
      }, 7000);
    }
  }, [hideNotification]);

  const notificationData = notifications?.find(
    ({ id: notificationId }) => notificationId === id,
  );

  const handleHide = (markAsSeen: boolean): void => {
    setHide(true);
    setTimeout(() => {
      if (markAsSeen) dispatch(markAsSeenById(id));
      dispatch(hideNewNotification(id));
    }, 500);
  };

  const handleClick = (): void => {
    if (notificationData) {
      history.push(
        `${NOTIFICATION_ROUTES[notificationData.type.name]}/${
          notificationData.targetId
        }`,
      );
    }

    if (!open) handleHide(true);
  };

  return notificationData ? (
    <Paper
      className={classNames(classes.paper, hide && classes.slideOut)}
      onClick={handleClick}
    >
      <Typography variant="body2" className={classes.text}>{`${
        notificationData.sender.firstName
      } ${notificationData.sender.lastName} ${
        NOTIFICATION_SUFFIXES[notificationData.type.name]
      }`}</Typography>
      {NOTIFICATION_ICONS[notificationData.type.name]}
    </Paper>
  ) : null;
};

export default Notification;
