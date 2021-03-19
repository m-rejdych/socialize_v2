import User from '../user';
import Message from './message';
import ReactionType from '../reactionType';

export default interface MessageReaction {
  id: number;
  user?: User;
  message?: Message;
  type?: ReactionType;
}
