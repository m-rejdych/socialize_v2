import { IsInt, IsIn } from 'class-validator';

import ReactionName from '../../reactionType/types/reactionName.type';
import reactionNames from '../../reactionType/constants/reactionNames.constant';

class AddCommentReactionDto {
  @IsInt()
  commentId: number;

  @IsIn(reactionNames)
  reactionName: ReactionName;
}

export default AddCommentReactionDto;
