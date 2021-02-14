import { IsInt, IsIn } from 'class-validator';
import ReactionName from '../../reactionType/types/reactionName.type';

class AddPostReacitnDto {
  @IsInt()
  postId: number;

  @IsIn(['like', 'dislike', 'love', 'laugh', 'idea'])
  reactionName: ReactionName;
}

export default AddPostReacitnDto;
