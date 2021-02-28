import Message from '../message.entity';

class MarkAllAsSeenResponseDto {
  chatId: number;
  messages: Message[];
}

export default MarkAllAsSeenResponseDto;
