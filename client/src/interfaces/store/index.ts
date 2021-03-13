import UserState from '../user/userState';
import DashboardState from '../dashboard/dashboardState';
import ProfileState from '../profile/profileState';
import FriendshipState from '../friendship/friendshipState';

export default interface RootState {
  user: UserState;
  dashboard: DashboardState;
  profile: ProfileState;
  friendship: FriendshipState;
}