import Friendship from './friendship';

export default interface FriendshipState {
  allFriendships: Friendship[];
  loading: boolean;
  error: null | string;
}
