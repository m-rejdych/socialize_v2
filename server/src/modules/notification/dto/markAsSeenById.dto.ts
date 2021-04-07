import { IsInt } from 'class-validator';

class MarkAsSeenByIdDto {
  @IsInt()
  notificationId: number;
}

export default MarkAsSeenByIdDto;
