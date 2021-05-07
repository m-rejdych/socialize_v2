import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getMyNotifications,
  resetNotifications,
} from '../../store/actions/notificationActions';
import RootState from '../../interfaces/store';
import Notification from '../../shared/components/NotificationProvider/components/Notification';

const Notifications: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyNotifications(null));

    return () => {
      dispatch(resetNotifications(null));
    };
  }, []);

  return (
    <div>
      {notifications?.map(({ id }) => (
        <Notification key={id} id={id} />
      ))}
    </div>
  );
};

export default Notifications;
