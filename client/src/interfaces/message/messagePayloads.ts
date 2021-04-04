import { ReactionName } from '../reactionType/reactionType';

export interface CreateMessagePayload {
  chatId: number;
  content: string;
  socket: SocketIOClient.Socket | null;
}

export interface AddMessageReactionPayload {
  messageId: number;
  reactionName: ReactionName;
  socket: SocketIOClient.Socket | null;
}
