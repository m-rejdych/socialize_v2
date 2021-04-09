import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import io from 'socket.io-client';

import RootState from '../../../interfaces/store';
import Notification from '../../../interfaces/notification';
import { API_URI } from '../../../config';

const NotificationProvider: React.FC = ({ children }) => {
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const socket = io(`${API_URI}/notifications`);

    socket.on('connect', (): void => {
      socket.emit('join-notifications', userId);
      console.log('connected');
    });

    socket.on('disconnect', (): void => {
      console.log('disconnected');
    });

    socket.on('notification', (notification: Notification): void => {
      console.log(notification);
    });

    return () => {
      socket.emit('leave-notifications');
      socket.disconnect();
    };
  }, [userId]);

  return <Box clone>{children}</Box>;
};

export default NotificationProvider;
