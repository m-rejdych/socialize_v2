import { useSelector } from 'react-redux';
import { Badge } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

import RootState from '../../../../interfaces/store';

const NotificationsBadge: React.FC = () => {
  const notSeenNotificationsCount = useSelector(
    (state: RootState) => state.notification.notSeenNotificationsCount,
  );

  return (
    <Badge badgeContent={notSeenNotificationsCount} color="secondary">
      <Notifications />
    </Badge>
  );
};

export default NotificationsBadge;
