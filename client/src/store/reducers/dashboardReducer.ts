import StrategyMap from 'src/interfaces/store/strategyMap';
import DashboardState from '../../interfaces/dashboard/dashboardState';
import createReducer from '../../util/reducerFactory';
import { DASHBOARD } from '../../shared/constants/actionTypes';
import { SetNavigationItemAction } from '../../interfaces/dashboard/dashboardActions';

const initialState: DashboardState = {
  selectedItem: 'home',
};

const strategyMap: StrategyMap<DashboardState, typeof DASHBOARD> = {
  [DASHBOARD.SET_NAVIGATION_ITEM]: setNavigationItemTransformer,
};

const dashboardReducer = createReducer<DashboardState, typeof DASHBOARD>(
  strategyMap,
  initialState,
);

function setNavigationItemTransformer(
  state: DashboardState,
  { payload }: ReturnType<SetNavigationItemAction>,
) {
  return { ...state, selectedItem: payload };
}

export default dashboardReducer;
