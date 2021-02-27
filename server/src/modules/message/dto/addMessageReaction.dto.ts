import { IsIn, IsInt } from 'class-validator';

import ReactionName from '../../reactionType/types/reactionName.type';
import reactionNames from '../../reactionType/constants/reactionNames.constant';

class AddMessageReactionDto {
  @IsInt()
  messageId: number;

  @IsIn(reactionNames)
  reactionName: ReactionName;
}

export default AddMessageReactionDto;
