import { ActionObject } from '../interfaces/store/action';
import StrategyMap from '../interfaces/store/strategyMap';

const createReducer = <T>(strategyMap: StrategyMap<T>, initialState: T) => <
  U,
  V
>(
  state = initialState,
  action: ActionObject<U, V>,
) => {
  if (strategyMap[action.type]) return strategyMap[action.type](state, action);
  return strategyMap.__default__(state);
};

export default createReducer;
