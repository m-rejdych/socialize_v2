import { ArrayMinSize, ArrayUnique, IsIn } from 'class-validator';

import chatNames from '../../chatType/constants/chatNames';
import ChatName from '../../chatType/types/chatName.type';

class CreateChatDto {
  @ArrayMinSize(2)
  @ArrayUnique()
  membersIds: number[];

  @IsIn(chatNames)
  type: ChatName;
}

export default CreateChatDto;
