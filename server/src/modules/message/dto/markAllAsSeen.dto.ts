import { IsInt } from 'class-validator';

class MarkAllAsSeenDto {
  @IsInt()
  chatId: number;
}

export default MarkAllAsSeenDto;
