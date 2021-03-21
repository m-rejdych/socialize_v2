import User from '../user';
import Post from './post';
import ReactionType from '../reactionType';

export default interface MessageReaction {
  id: number;
  user?: User;
  post?: Post;
  type?: ReactionType;
}
