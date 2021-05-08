import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getMyNotifications,
  resetNotifications,
  setSkip,
} from '../../store/actions/notificationActions';
import RootState from '../../interfaces/store';
import Notification from '../../shared/components/NotificationProvider/components/Notification';

const TAKE = 20;

const Notifications: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications,
  );
  const notificationsCount = useSelector(
    (state: RootState) => state.notification.notificationsCount,
  );
  const skip = useSelector((state: RootState) => state.notification.skip);
  const notificationsLoading = useSelector(
    (state: RootState) => state.notification.notificationsLoading,
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dispatch = useDispatch();

  const hasMore = skip < notificationsCount - TAKE;

  useEffect(() => {
    return () => {
      dispatch(resetNotifications(null));
    };
  }, []);

  useEffect(() => {
    dispatch(getMyNotifications(null));
  }, [skip]);

  const lastNotificationRef = useCallback(
    (node: HTMLDivElement): void => {
      if (notificationsLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(setSkip(notifications ? notifications.length : skip + TAKE));
        }
      });
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [notificationsLoading, notifications, hasMore],
  );

  return (
    <div>
      {notifications?.map(({ id }, index) => (
        <Notification
          addTime
          key={id}
          id={id}
          notificationRef={
            index === notifications.length - 1 ? lastNotificationRef : null
          }
        />
      ))}
    </div>
  );
};

export default Notifications;
