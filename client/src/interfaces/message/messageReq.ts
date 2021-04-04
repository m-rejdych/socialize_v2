import { ReactionName } from '../reactionType/reactionType';

export interface CreateMessageReq {
  chatId: number;
  content: string;
}

export interface AddMessageReactionReq {
  messageId: number;
  reactionName: ReactionName;
}
