import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import io from 'socket.io-client';

import RootState from '../../../../interfaces/store';
import Notification from '../../../../interfaces/notification';
import NotificationElement from './Notification';
import {
  addNotification,
  getNotSeenNotificationsCount,
} from '../../../../store/actions/notificationActions';
import { API_URI } from '../../../../config';

const Notifications: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const newNotifications = useSelector(
    (state: RootState) => state.notification.newNotifications,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotSeenNotificationsCount(null));
  }, []);

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
      dispatch(addNotification(notification));
      console.log(notification);
    });

    return () => {
      socket.emit('leave-notifications');
      socket.disconnect();
    };
  }, [userId]);

  return (
    <Box position="fixed" left={24} bottom={24}>
      {newNotifications?.map((id) => (
        <NotificationElement key={`notification-${id}`} id={id} />
      )) || null}
    </Box>
  );
};

export default Notifications;
