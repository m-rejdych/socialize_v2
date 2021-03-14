import Friendship from './friendship';

export default interface FriendshipState {
  allFriendships: Friendship[];
  selectedFriendship: Friendship | null;
  loading: boolean;
  initialLoad: boolean;
  error: null | string;
}
