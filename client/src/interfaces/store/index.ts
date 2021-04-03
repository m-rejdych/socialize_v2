import UserState from '../user/userState';
import ProfileState from '../profile/profileState';
import FriendshipState from '../friendship/friendshipState';
import PostState from '../post/postState';
import ChatState from '../chat/chatState';

export default interface RootState {
  user: UserState;
  profile: ProfileState;
  friendship: FriendshipState;
  post: PostState;
  chat: ChatState;
}
