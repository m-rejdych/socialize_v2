import createAction from '../../util/actionFactory';
import { SetNavigationItemAction } from '../../interfaces/dashboard/dashboardActions';
import { DASHBOARD } from '../../shared/constants/actionTypes';

export const setNavigationItem: SetNavigationItemAction = createAction(
  DASHBOARD.SET_NAVIGATION_ITEM,
);
