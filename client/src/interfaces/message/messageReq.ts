import { ReactionName } from '../reactionType/reactionType';

export interface GetMessagesByChatIdReq {
  chatId: number;
  take?: number;
  skip?: number;
}

export interface CreateMessageReq {
  chatId: number;
  content: string;
}

export interface AddMessageReactionReq {
  messageId: number;
  reactionName: ReactionName;
}
