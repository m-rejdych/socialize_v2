import { IsInt, IsIn } from 'class-validator';

import NotificationName from '../../notificationType/types/notificationName.type';
import NOTIFICATION_NAMES from '../../notificationType/constants/notificationNames.constant';

class CreateNotificationDto {
  @IsInt()
  from: number;

  @IsInt()
  to: number;

  @IsInt()
  targetId: number;

  @IsIn(NOTIFICATION_NAMES)
  notificationName: NotificationName;
}

export default CreateNotificationDto;
