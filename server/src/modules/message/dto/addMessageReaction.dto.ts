import { IsIn, IsInt } from 'class-validator';

import ReactionName from '../../reactionType/types/reactionName.type';
import REACTION_NAMES from '../../reactionType/constants/reactionNames.constant';

class AddMessageReactionDto {
  @IsInt()
  messageId: number;

  @IsIn(REACTION_NAMES)
  reactionName: ReactionName;
}

export default AddMessageReactionDto;
