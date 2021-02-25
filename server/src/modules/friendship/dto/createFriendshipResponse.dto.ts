import Friendhsip from '../friendship.entity';
import Chat from '../../chat/chat.entity';

class CreateFriendshipResponseDto {
  friendship: Friendhsip;
  chat: Chat;
}

export default CreateFriendshipResponseDto;
