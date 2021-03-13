import Friendship from './friendship';

export default interface FriendshipState {
  allFriendships: Friendship[];
  loading: boolean;
  initialLoad: boolean;
  error: null | string;
}
