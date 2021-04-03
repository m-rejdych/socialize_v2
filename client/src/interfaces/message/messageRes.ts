import Message from './message';

export interface GetMessagesByChatIdRes {
  data?: Message[];
}

export interface CreateMessageRes {
  data?: Message;
}
