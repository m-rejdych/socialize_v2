import User from '../user';
import Comment from './comment';
import ReactionType from '../reactionType';

export default interface MessageReaction {
  id: number;
  user?: User;
  comment?: Comment;
  type?: ReactionType;
}
