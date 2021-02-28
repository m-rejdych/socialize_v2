import { IsInt } from 'class-validator';

class MarkAsSeenDto {
  @IsInt()
  messageId: number;
}

export default MarkAsSeenDto;
