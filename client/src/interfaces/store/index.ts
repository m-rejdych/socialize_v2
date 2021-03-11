import UserState from '../user/userState';
import DashboardState from '../dashboard/dashboardState';

export default interface RootState {
  user: UserState;
  dashboard: DashboardState;
}
