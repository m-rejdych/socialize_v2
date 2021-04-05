import Message from './message';

export interface GetMessagesByChatIdRes {
  data?: Message[];
}

export interface GetMessagesCountByChatIdRes {
  data?: number;
}

export interface CreateMessageRes {
  data?: Message;
}

export interface DeleteMessageReactionRes {
  data?: {
    reactionId: number;
    messageId: number;
    chatId: number;
    userId: number;
    deleted: boolean;
  };
}
