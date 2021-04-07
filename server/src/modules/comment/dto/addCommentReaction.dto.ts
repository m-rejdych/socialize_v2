import { IsInt, IsIn } from 'class-validator';

import ReactionName from '../../reactionType/types/reactionName.type';
import REACTION_NAMES from '../../reactionType/constants/reactionNames.constant';

class AddCommentReactionDto {
  @IsInt()
  commentId: number;

  @IsIn(REACTION_NAMES)
  reactionName: ReactionName;
}

export default AddCommentReactionDto;
