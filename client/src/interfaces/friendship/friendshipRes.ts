import Friendship from './friendship';
import Chat from '../chat';

export interface GetAllFriendshipsRes {
  data?: Friendship[];
}

export interface GetFriendshipRes {
  data?: Friendship;
}

export interface CreateFriendshipRes {
  data?: Friendship;
}

export interface AcceptFriendshipRes {
  data?: {
    friendship: Friendship;
    chat: Chat;
  };
}

export interface DeleteFriendshipRes {
  data?: {
    userId: number;
    friendId: number;
    deleted: boolean;
  };
}
